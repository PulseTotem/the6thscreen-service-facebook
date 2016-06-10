/**
 * @author Simon Urli <simon@the6thscreen.fr>
 */

/// <reference path="../../t6s-core/core-backend/scripts/Logger.ts" />
/// <reference path="../../t6s-core/core-backend/scripts/server/SourceItf.ts" />
/// <reference path="../FacebookUtils.ts" />

class PicturesFromAlbum extends SourceItf {

	constructor(params : any, facebookNamespaceManager : FacebookNamespaceManager) {
		super(params, facebookNamespaceManager);

		if (this.checkParams(["Limit", "InfoDuration", "AlbumID", "oauthKey"])) {
			this.run();
		}
	}

	run() {
		var self = this;

		var fail = function(error) {
			if(error) {
				Logger.error(error);
			}
		};

		var success = function(oauthActions) {
			var successSearch = function (information) {
				var pictureAlbum : PictureAlbum = FacebookUtils.extractDataFromPhotoResult(information, self.getParams());
				pictureAlbum.setDurationToDisplay(parseInt(self.getParams().InfoDuration) * pictureAlbum.getPictures().length);
				self.getSourceNamespaceManager().sendNewInfoToClient(pictureAlbum);
			};


			var userPhoto = 'https://graph.facebook.com/'+self.getParams().AlbumID+'?fields=photos.limit('+self.getParams().Limit+')';
			oauthActions.get(userPhoto, successSearch, fail);
		};

		self.getSourceNamespaceManager().manageOAuth('facebook', self.getParams().oauthKey, success, fail);
	}
}