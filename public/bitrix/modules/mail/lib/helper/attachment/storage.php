<?php

namespace Bitrix\Mail\Helper\Attachment;

use Bitrix\Main;
use Bitrix\Main\Localization\Loc;
use Bitrix\Mail;

class Storage
{

	/**
	 * Returns attachments disk storage
	 *
	 * @return \Bitrix\Disk\Storage|false
	 */
	public static function getStorage()
	{
		static $storage;

		if (!is_null($storage))
		{
			return $storage;
		}

		$storage = false;

		if (!Main\Loader::includeModule('disk'))
		{
			return $storage;
		}

		$storageId = Main\Config\Option::get('mail', 'disk_attachment_storage_id', 0);
		if ($storageId > 0)
		{
			$storage = \Bitrix\Disk\Storage::loadById($storageId);
			if (!$storage || $storage->getModuleId() != 'mail')
			{
				$storage = false;
			}
		}

		if (!$storage)
		{
			$driver = \Bitrix\Disk\Driver::getInstance();

			$storage = $driver->addStorageIfNotExist(array(
				'NAME' => Loc::getMessage('MAIL_ATTACHMENT_STORAGE_NAME'),
				'USE_INTERNAL_RIGHTS' => false,
				'MODULE_ID' => 'mail',
				'ENTITY_TYPE' => Mail\Disk\ProxyType\Mail::className(),
				'ENTITY_ID' => 'mail',
			));
			if ($storage)
			{
				Main\Config\Option::set('mail', 'disk_attachment_storage_id', $storage->getId());
			}
			else
			{
				$storage = false;
			}
		}

		return $storage;
	}

	/**
	 * Returns disk url manager
	 *
	 * @return \Bitrix\Disk\UrlManager|false
	 */
	public static function getUrlManager()
	{
		static $urlManager;

		if (!is_null($urlManager))
		{
			return $urlManager;
		}

		$urlManager = false;

		if (!Main\Loader::includeModule('disk'))
		{
			return $urlManager;
		}

		$urlManager = \Bitrix\Disk\Driver::getInstance()->getUrlManager();

		return $urlManager;
	}

	/**
	 * Returns disk object by attachment file data
	 *
	 * @param array $attachment Attachment file data.
	 * @param boolean $create Create object if not exists.
	 * @return \Bitrix\Disk\File|false|null
	 */
	public static function getObjectByAttachment(array $attachment, $create = false)
	{
		if (!Main\Loader::includeModule('disk'))
		{
			return false;
		}

		$storage = static::getStorage();

		$object = \Bitrix\Disk\File::getModelList(array(
			'filter' => array(
				'=STORAGE_ID' => $storage->getId(),
				'=TYPE' => \Bitrix\Disk\Internals\ObjectTable::TYPE_FILE,
				'=FILE_ID' => $attachment['FILE_ID'],
			),
			'order' => array(
				'ID' => 'DESC',
			),
			'limit' => 1,
		))[0];

		if (empty($object) && $create)
		{
			$object = static::registerAttachment($attachment);
		}

		return $object;
	}

	/**
	 * Creates disk object for attachment file
	 *
	 * @param array $attachment Attachment file data.
	 * @return \Bitrix\Disk\File|false|null
	 */
	public static function registerAttachment(array $attachment)
	{
		if (!Main\Loader::includeModule('disk'))
		{
			return false;
		}

		$storage = static::getStorage();

		$folder = $storage->getChild(array(
			'=NAME' => date('Y-m'),
			'=TYPE' => \Bitrix\Disk\Internals\FolderTable::TYPE,
		));

		if (!$folder)
		{
			$folder = $storage->addFolder(array(
				'NAME' => date('Y-m'),
				'CREATED_BY' => 1, // @TODO
			));
		}

		if (!$folder)
		{
			$folder = $storage;
		}

		return $folder->addFile(
			array(
				'NAME' => \Bitrix\Disk\Ui\Text::correctFilename($attachment['FILE_NAME']) ?: sprintf('%x', rand(0, 0xffffff)),
				'FILE_ID' => $attachment['FILE_ID'],
				'SIZE' => $attachment['FILE_SIZE'],
				'CREATED_BY' => 1, // @TODO
			),
			array(),
			true
		);
	}

}
