/**
 * @author Christian Brel <christian@pulsetotem.fr, ch.brel@gmail.com>
 */

/// <reference path="../../t6s-core/core-backend/scripts/Logger.ts" />
/// <reference path="../../t6s-core/core-backend/scripts/server/SourceItf.ts" />
/// <reference path="../FacebookUtils.ts" />

/**
 * Represents the PageFeed Facebook's Source.
 *
 * @class PageFeed
 * @extends SourceItf
 */
class PageFeed extends SourceItf {

	/**
	 * Constructor.
	 *
	 * @param {Object} params - Source's params.
	 * @param {FacebookNamespaceManager} facebookNamespaceManager - NamespaceManager attached to Source.
	 */
	constructor(params : any, facebookNamespaceManager : FacebookNamespaceManager) {
		super(params, facebookNamespaceManager);

		if (this.checkParams(["Limit", "InfoDuration", "PageName", "oauthKey"])) {
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
				Logger.debug(information);
			};


			var pageDescURL = 'https://graph.facebook.com/v2.5/' + self.getParams().PageName + '/posts?fields=picture,message,name,type,created_time,link,shares,likes,from';
			oauthActions.get(pageDescURL, successSearch, fail);
		};

		self.getSourceNamespaceManager().manageOAuth('facebook', self.getParams().oauthKey, success, fail);
	}
}