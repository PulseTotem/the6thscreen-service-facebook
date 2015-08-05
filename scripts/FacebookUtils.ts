/**
 * @author Simon Urli <simon@the6thscreen.fr>
 */

/// <reference path="../t6s-core/core-backend/t6s-core/core/scripts/infotype/PictureAlbum.ts" />
/// <reference path="../t6s-core/core-backend/t6s-core/core/scripts/infotype/Picture.ts" />
/// <reference path="../t6s-core/core-backend/t6s-core/core/scripts/infotype/PictureURL.ts" />

class FacebookUtils {

	static extractDataFromPhotoResult(information : any, params : any) : PictureAlbum {
		var pictureAlbum : PictureAlbum = new PictureAlbum();
		var result = information.photos;
		var listPhotos = result.data;

		pictureAlbum.setId(uuid.v1());
		pictureAlbum.setPriority(0);

		for (var i = 0; i < listPhotos.length; i++) {
			var photo = listPhotos[i];

			var pic : Picture = new Picture(photo.id, 0, new Date(photo.created_time), null, parseInt(params.InfoDuration));
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
				FacebookUtils.extractPhotoResolutions(pic, currentPic);
			}
			pictureAlbum.addPicture(pic);
		}

		return pictureAlbum;
	}

	static extractPhotoResolutions(pictureObject : Picture, pictureDatas : any) {
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
}