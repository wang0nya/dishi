'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Keeps track of the length of the 'likes' child list in a separate property.
exports.countlikeschange = functions.database.ref('/recipes/{recipeid}/likes/{userid}').onWrite((event) => {
  const likes_collectionRef = event.data.ref.parent;
  const likes_countRef = likes_collectionRef.parent.child('likes_count');

  let likes_increment;
  if (event.data.exists() && !event.data.previous.exists()) {
    likes_increment = 1;
  } else if (!event.data.exists() && event.data.previous.exists()) {
    likes_increment = -1;
  } else {
    return null;
  }

  // Return the promise from countRef.transaction() so our function
  // waits for this async event to complete before it exits.
  return likes_countRef.transaction((likes_current) => {
    return (likes_current || 0) + likes_increment;
  }).then(() => {
    return console.log('likes_Counter updated.');
  });
});
