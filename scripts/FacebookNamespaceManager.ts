/**
 * @author Simon Urli <simon@the6thscreen.fr>
 */

/// <reference path="../t6s-core/core-backend/libsdef/node-uuid.d.ts" />

/// <reference path="../t6s-core/core-backend/scripts/Logger.ts" />
/// <reference path="../t6s-core/core-backend/scripts/server/SourceNamespaceManager.ts" />

/// <reference path="./sources/PicturesFromAlbum.ts" />
/// <reference path="./sources/PicturesFromLoggedUser.ts" />
/// <reference path="./sources/PicturesFromPage.ts" />
/// <reference path="./sources/PageFeed.ts" />

class FacebookNamespaceManager extends SourceNamespaceManager {

	/**
	 * Constructor.
	 *
	 * @constructor
	 * @param {any} socket - The socket.
	 */
	constructor(socket : any) {
		super(socket);
		this.addListenerToSocket('PicturesFromLoggedUser', function (params, self) { new PicturesFromLoggedUser(params, self); });
		this.addListenerToSocket('PicturesFromPage', function (params, self) { new PicturesFromPage(params, self); });
		this.addListenerToSocket('PicturesFromAlbum', function (params, self) { new PicturesFromAlbum(params, self); });
		this.addListenerToSocket('PageFeed', function (params, self) { new PageFeed(params, self); });
	}
}