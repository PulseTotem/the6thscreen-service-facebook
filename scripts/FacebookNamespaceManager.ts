/**
 * @author Simon Urli <simon@the6thscreen.fr>
 */

/// <reference path="../t6s-core/core-backend/libsdef/node-uuid.d.ts" />

/// <reference path="../t6s-core/core-backend/scripts/Logger.ts" />

/// <reference path="../t6s-core/core-backend/scripts/server/SourceNamespaceManager.ts" />

/// <reference path="../t6s-core/core-backend/t6s-core/core/scripts/infotype/PictureAlbum.ts" />
/// <reference path="../t6s-core/core-backend/t6s-core/core/scripts/infotype/Picture.ts" />
/// <reference path="../t6s-core/core-backend/t6s-core/core/scripts/infotype/PictureURL.ts" />

var datejs : any = require('datejs');

var DateJS : any = <any>Date;
var uuid : any = require('node-uuid');

var util = require('util');

class FacebookNamespaceManager extends SourceNamespaceManager {

	/**
	 * Constructor.
	 *
	 * @constructor
	 * @param {any} socket - The socket.
	 */
	constructor(socket : any) {
		super(socket);
		this.addListenerToSocket('PicturesFromLoggedUser', this.retrievePicturesFromLoggedUser);
		this.addListenerToSocket('PicturesFromPage', this.retrievePicturesFromPage);
		this.addListenerToSocket('PicturesFromAlbum', this.retrievePicturesFromAlbum);
	}

	extractDataFromPhotoResult(information : any) : PictureAlbum {
		var pictureAlbum : PictureAlbum = new PictureAlbum();
		var result = information.photos;
		var listPhotos = result.data;

		pictureAlbum.setId(uuid.v1());
		pictureAlbum.setPriority(0);

		for (var i = 0; i < listPhotos.length; i++) {
			var photo = listPhotos[i];

			var pic : Picture = new Picture(photo.id, 0, new Date(photo.created_time), null, 10000);
			//pic.setDescription(photo.description._content);
			if (photo.name) {
				pic.setTitle(photo.name);
			}

			var original = new PictureURL(photo.id+"_original");
			original.setURL(photo.source);
			original.setHeight(photo.height);
			original.setWidth(photo.width);

			pic.setOriginal(original);

			var images = photo.images;

			for (var j = 0; j < images.length; j++) {
				var currentPic : any = images[j];
				this.extractPhotoResolutions(pic, currentPic);
			}
			pictureAlbum.addPicture(pic);
		}

		Logger.debug("Send PictureAlbum to client : ");
		Logger.debug(pictureAlbum);
		return pictureAlbum;
	}

	extractPhotoResolutions(pictureObject : Picture, pictureDatas : any) {
		var picUrl = new PictureURL(uuid.v1());
		picUrl.setURL(pictureDatas.source);
		picUrl.setHeight(pictureDatas.height);
		picUrl.setWidth(pictureDatas.width);

		if (pictureDatas.width >= 800) {
			pictureObject.setLarge(picUrl);
		} else if (pictureDatas.width < 800 && pictureDatas.width >= 500) {
			pictureObject.setMedium(picUrl);
		}  else if (pictureDatas.width < 500 && pictureDatas.width >= 200) {
			pictureObject.setSmall(picUrl);
		} else {
			pictureObject.setThumb(picUrl);
		}
	}

	retrievePicturesFromLoggedUser(params : any, self : FacebookNamespaceManager = null) {
		if (self == null) {
			self = this;
		}

		Logger.debug("PicturesFromLoggedUser Action with params :");
		Logger.debug(params);

		var fail = function(error) {
			if(error) {
				Logger.error(error);
			}
		};

		var success = function(oauthActions) {
			var successSearch = function (information) {
				console.log("Obtained informations : ");
				console.log(JSON.stringify(information));
				var pictureAlbum : PictureAlbum = self.extractDataFromPhotoResult(information);
				self.sendNewInfoToClient(pictureAlbum);
			};


			var userPhoto = 'https://graph.facebook.com/me?fields=photos.limit('+params.Limit+')';
			oauthActions.get(userPhoto, successSearch, fail);
		};

		self.manageOAuth('facebook', params.oauthKey, success, fail);
	}

	retrievePicturesFromPage(params : any, self : FacebookNamespaceManager = null) {
		if (self == null) {
			self = this;
		}

		Logger.debug("PicturesFromLoggedUser Action with params :");
		Logger.debug(params);

		var fail = function(error) {
			if(error) {
				Logger.error(error);
			}
		};

		var success = function(oauthActions) {
			var successSearch = function (information) {
				console.log("Obtained informations : ");
				console.log(JSON.stringify(information));
				var pictureAlbum : PictureAlbum = self.extractDataFromPhotoResult(information);
				self.sendNewInfoToClient(pictureAlbum);
			};


			var userPhoto = 'https://graph.facebook.com/'+params.PageName+'?fields=photos.limit('+params.Limit+')';
			oauthActions.get(userPhoto, successSearch, fail);
		};

		self.manageOAuth('facebook', params.oauthKey, success, fail);
	}

	retrievePicturesFromAlbum(params : any, self : FacebookNamespaceManager = null) {
		if (self == null) {
			self = this;
		}

		Logger.debug("PicturesFromLoggedUser Action with params :");
		Logger.debug(params);

		var fail = function(error) {
			if(error) {
				Logger.error(error);
			}
		};

		var success = function(oauthActions) {
			var successSearch = function (information) {
				console.log("Obtained informations : ");
				console.log(JSON.stringify(information));
				var pictureAlbum : PictureAlbum = self.extractDataFromPhotoResult(information);
				self.sendNewInfoToClient(pictureAlbum);
			};


			var userPhoto = 'https://graph.facebook.com/'+params.AlbumID+'?fields=photos.limit('+params.Limit+')';
			oauthActions.get(userPhoto, successSearch, fail);
		};

		self.manageOAuth('facebook', params.oauthKey, success, fail);
	}
}