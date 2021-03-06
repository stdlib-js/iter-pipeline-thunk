/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var tape = require( 'tape' );
var array2iterator = require( '@stdlib/array-to-iterator' );
var iterSome = require( '@stdlib/iter-some' );
var iterThunk = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof iterThunk, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function throws an error if not provided a function for the first argument', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		true,
		false,
		null,
		void 0,
		{},
		[]
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			iterThunk( value );
		};
	}
});

tape( 'the function throws an error if not provided a function for the first argument (other arguments)', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		true,
		false,
		null,
		void 0,
		{},
		[]
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			iterThunk( value, 1, 2, 3 );
		};
	}
});

tape( 'the function returns a function which throws an error if not provided an iterator', function test( t ) {
	var values;
	var thunk;
	var i;

	thunk = iterThunk( iterSome, 2 );

	values = [
		'5',
		5,
		NaN,
		true,
		false,
		null,
		void 0,
		{},
		[],
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			thunk( value );
		};
	}
});

tape( 'the function returns a function which invokes an iterator function with a provided iterator and previously provided function arguments', function test( t ) {
	var thunk;
	var bool;
	var arr;

	thunk = iterThunk( iterSome, 3 );

	arr = array2iterator( [ 0, 0, 1, 1, 1 ] );
	bool = thunk( arr );
	t.strictEqual( bool, true, 'returns expected value' );

	arr = array2iterator( [ 0, 0, 1, 0, 1 ] );
	bool = thunk( arr );
	t.strictEqual( bool, false, 'returns expected value' );

	t.end();
});
