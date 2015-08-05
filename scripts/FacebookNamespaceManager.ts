/**
 * @author Simon Urli <simon@the6thscreen.fr>
 */

/// <reference path="../t6s-core/core-backend/libsdef/node-uuid.d.ts" />

/// <reference path="../t6s-core/core-backend/scripts/Logger.ts" />
/// <reference path="../t6s-core/core-backend/scripts/server/SourceNamespaceManager.ts" />

/// <reference path="./sources/PicturesFromAlbum.ts" />
/// <reference path="./sources/PicturesFromLoggedUser.ts" />
/// <reference path="./sources/PicturesFromPage.ts" />

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
}