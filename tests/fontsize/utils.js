/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import { normalizeOptions } from '../../src/fontsize/utils';

describe( 'FontSizeEditing Utils', () => {
	describe( 'normalizeOptions()', () => {
		it( 'should discard unsupported values', () => {
			expect( normalizeOptions( [ () => {}, 'normal', 'unknown' ] ) ).to.deep.equal( [ { title: 'Normal', model: undefined } ] );
		} );

		it( 'should pass through object definition', () => {
			expect( normalizeOptions( [ {
				title: 'My Size',
				model: 'my-size',
				view: { name: 'span', style: 'font-size: 12em;' }
			} ] ) ).to.deep.equal( [
				{
					title: 'My Size',
					model: 'my-size',
					view: { name: 'span', style: 'font-size: 12em;' }
				}
			] );
		} );

		describe( 'named presets', () => {
			it( 'should return defined presets', () => {
				expect( normalizeOptions( [ 'tiny', 'small', 'normal', 'big', 'huge' ] ) ).to.deep.equal( [
					{ title: 'Tiny', model: 'tiny', view: { name: 'span', class: 'text-tiny' } },
					{ title: 'Small', model: 'small', view: { name: 'span', class: 'text-small' } },
					{ title: 'Normal', model: undefined },
					{ title: 'Big', model: 'big', view: { name: 'span', class: 'text-big' } },
					{ title: 'Huge', model: 'huge', view: { name: 'span', class: 'text-huge' } }
				] );
			} );
		} );

		describe( 'numeric presets', () => {
			it( 'should return generated presets', () => {
				expect( normalizeOptions( [ '10', 12, 'normal', '14.1', 18.3 ] ) ).to.deep.equal( [
					{ title: '10', model: 10, view: { name: 'span', style: { 'font-size': '10px' } } },
					{ title: '12', model: 12, view: { name: 'span', style: { 'font-size': '12px' } } },
					{ title: 'Normal', model: undefined },
					{ title: '14.1', model: 14.1, view: { name: 'span', style: { 'font-size': '14.1px' } } },
					{ title: '18.3', model: 18.3, view: { name: 'span', style: { 'font-size': '18.3px' } } }
				] );
			} );
		} );
	} );
} );
