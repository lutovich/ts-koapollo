import * as chai from 'chai';
import * as chaiImmutable from 'chai-immutable';
import * as jsdom from 'jsdom';

declare module NodeJS {
	interface Global {
		document: any,
		window: any
	}
}

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');

const win = doc.defaultView;

document = doc;
window = win;

propagateToGlobal( win );

function propagateToGlobal ( window ) {
	for ( let key in window ) {
		if ( !window.hasOwnProperty( key ) ) continue;
		if ( key in global ) continue;

		global[ key ] = window[ key ];
	}
}

chai.use(chaiImmutable);
