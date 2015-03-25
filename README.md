# angularUniqueWindowIdentifier

Service for uniquely identifying a browser window. Persists beyond window refresh. You can use it without Angular as well.

### Basic Setup

First, add this module to your application:

	angular.module('myApp', ['angularUniqueWindow'])

### Methods

#### uniqueWindowIdentifier.ensure()

Creates a unique token for your browser window that will persist after a reload if it doesn't already exist.

#### uniqueWindowIdentifier.get()

Returns the saved token.

#### uniqueWindowIdentifier.reset()

Regenerates the token.