/** @author Simon Urli <simon@the6thscreen.fr>  */

/// <reference path="../t6s-core/core-backend/scripts/server/SourceServer.ts" />
/// <reference path="../t6s-core/core-backend/scripts/Logger.ts" />

/// <reference path="./FacebookNamespaceManager.ts" />

class Facebook extends SourceServer {

	/**
	 * Constructor.
	 *
	 * @param {number} listeningPort - Server's listening port..
	 * @param {Array<string>} arguments - Server's command line arguments.
	 */
	constructor(listeningPort : number, arguments : Array<string>) {
		super(listeningPort, arguments);

		this.init();
	}

	/**
	 * Method to init the Flickr server.
	 *
	 * @method init
	 */
	init() {
		var self = this;

		this.addNamespace("Facebook", FacebookNamespaceManager);
	}
}

/**
 * Server's Flickr listening port.
 *
 * @property _FlickrListeningPort
 * @type number
 * @private
 */
var _FacebookListeningPort : number = process.env.PORT || 6006;

/**
 * Server's Twitter command line arguments.
 *
 * @property _TwitterArguments
 * @type Array<string>
 * @private
 */
var _FacebookArguments : Array<string> = process.argv;

var serverInstance = new Flickr(_FacebookListeningPort, _FacebookArguments);
serverInstance.run();