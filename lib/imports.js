if (Meteor.isServer) {
    NpmFileSystem = Npm.require('fs');
    NpmPath = Npm.require('path');
}