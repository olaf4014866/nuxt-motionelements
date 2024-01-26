// inbox service use notification
// After user click and viewed a notification. need you to POST to mark_viewed, so we can track what and when was viewed
// example, i need to merge in ‘official annoucements’, ‘buyer messages/feedback’, etc. into ‘notifications’.
// thats why i think we should call it an inbox.
import * as inboxApi from '@motionelements/core/src/api/inbox';

/**
 * MEMBER /account
 */

export async function listMemberNotifications() {
  return inboxApi.listMemberNotifications();
}

/**
 * get notification detail
 * @param {String} id
 */

export async function getMemberNotification(id) {
  return inboxApi.getMemberNotification(id);
}

/**
 * mark notification as viewed
 * @param {String} id
 */
export async function viewedMemberNotification(id) {
  return inboxApi.markMemberNotificationAsViewed(id);
}


/**
 * ARTIST /artist
 */

export async function listArtistNotifications() {
  return inboxApi.listArtistNotifications();
}

/**
 * get notification detail
 * @param {String} id
 */

export async function getArtistNotification(id) {
  return inboxApi.getArtistNotification(id);
}

/**
 * mark notification as viewed
 * @param {String} id
 */
export async function viewedArtistNotification(id) {
  return inboxApi.markArtistNotificationAsViewed(id);
}
