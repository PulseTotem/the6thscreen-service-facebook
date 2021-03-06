/**
 * @author Simon Urli <simon@the6thscreen.fr>
 */

/// <reference path="../../t6s-core/core-backend/t6s-core/core/libsdef/mocha.d.ts" />
/// <reference path="../../t6s-core/core-backend/libsdef/sinon.d.ts" />

/// <reference path="../../scripts/sources/PicturesFromLoggedUser.ts" />

var assert = require("assert");
var sinon : SinonStatic = require("sinon");

describe('PicturesFromLoggedUser', function() {
	describe('#constructor', function () {
		it('should launch run with the proper parameters', function () {
			var mockAlbum = sinon.mock(PicturesFromLoggedUser.prototype);
			mockAlbum.expects('run').once();

			var params = { "Limit": "43", "InfoDuration": "10", "oauthKey": "token"};

			var stubNSManager : any = sinon.createStubInstance(FacebookNamespaceManager);
			new PicturesFromLoggedUser(params, stubNSManager);
			mockAlbum.verify();
		});

		it('should not launch run if the limit parameter is missing', function () {
			var mockAlbum = sinon.mock(PicturesFromLoggedUser.prototype);
			mockAlbum.expects('run').never();

			var params = { "InfoDuration": "10", "oauthKey": "token", "AlbumID": "Un super ID"};

			var stubNSManager : any = sinon.createStubInstance(FacebookNamespaceManager);
			new PicturesFromLoggedUser(params, stubNSManager);
			mockAlbum.verify();
		});

		it('should not launch run with the InfoDuration parameter is missing', function () {
			var mockAlbum = sinon.mock(PicturesFromLoggedUser.prototype);
			mockAlbum.expects('run').never();

			var params = { "Limit": "43", "oauthKey": "token", "AlbumID": "Un super ID"};

			var stubNSManager : any = sinon.createStubInstance(FacebookNamespaceManager);
			new PicturesFromLoggedUser(params, stubNSManager);
			mockAlbum.verify();
		});

		it('should not launch run with the oAuthKey parameter is missing', function () {
			var mockAlbum = sinon.mock(PicturesFromLoggedUser.prototype);
			mockAlbum.expects('run').never();

			var params = { "Limit": "43", "InfoDuration": "10", "AlbumID": "Un super ID"};

			var stubNSManager : any = sinon.createStubInstance(FacebookNamespaceManager);
			new PicturesFromLoggedUser(params, stubNSManager);
			mockAlbum.verify();
		});
	});

	describe('#run', function () {
		// TODO
	});
});