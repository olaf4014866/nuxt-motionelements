import store from '@/store/index.js';

// bridge services to store commit
function setAlert(params) {
  const alert = store.getters['notification/alert'];
  const message = params;

  // random uniqid id
  message.id = (new Date()).getTime() + _.get(message, 'title', '') + _.get(message, 'detail', '');

  // console.log('setAlert: ', params);
  if (['info', 'success'].indexOf(params.level) > -1) {
    message.autohide = true;
    message.delay = 5000;
  }
  alert.status = true;
  alert.contents.push(message);
  store.commit('notification/setAlertMessage', alert);
}

// function clearFlash() {
//   const flash = store.getters['notification/flash'];
//   flash.status = false;
//   flash.contents = [];
//   store.commit('notification/setFlashMessage', flash);
// }

// function setFlash(params) {
//   const flash = store.getters['notification/flash'];
//   flash.status = true;
//   flash.contents.push(params);
//   // console.log('setFlash: ', params);
//   store.commit('notification/setFlashMessage', flash);
// }

function addFlashMessage(message) {
  const defaultMessage = {
    object: 'message',
    type: 'flash',
  };

  store.dispatch('notification/addFlashMessage', {
    ...defaultMessage,
    ...message,
  });
}

// function showAnnouncement(params) {
//   const notify = store.getters['site/notifyMessages'];
//   notify.status = true;
//   notify.contents.push(params);
//   store.dispatch('site/setNotifyMessages', notify);
// }
function messagesTypeSwitch(message) {
  // console.log('messagesTypeSwitch: ', message);
  switch (message.type) {
    case 'alert':
      setAlert(message);
      break;
    case 'flash':
      addFlashMessage(message);
      break;
    // case 'announcement':
    //   showAnnouncement(announcementMessageFormat);
    //   break;
    default:
      break;
  }
}

function removeFlashMessage(index) {
  console.log('removeFlashMessage', index);
  const flash = store.getters['notification/flash'];
  console.log(flash.contents);
  const newArr = flash.contents.splice(index, 1);
  console.log(newArr);
  // clearFlash();
  // setFlash(newArr);
}

function alert(message) {
  const defaultMessage = {
    object: 'message',
    type: 'alert',
  };
  setAlert({
    ...defaultMessage,
    ...message,
  });
}

function flash(message) {
  addFlashMessage(message);
}

// handle response has notification/alert
function handleResponseNotification(response) {
  // console.log('handleResponseNotification: ', params);
  const messages = _.get(response, 'data.messages', []);

  if (messages && messages.length > 0) {
    // handle multiple
    messages.forEach((message) => {
      messagesTypeSwitch(message);
    });
    // messagesTypeSwitch(...messages);
  }
  // else if (messages.length > 1) {
  //   messages.forEach(m => {
  //     messagesTypeSwitch(m);
  //   });
  // }

  // if ([500, 401].find(x => x === res.status)) {
  //   title = res.statusText;
  //   detail = res.statusText;
  //   // console.error(params.response.statusText);
  // }
  // multiple error message
  // if (data) {
  //   if (data.messages.length === 1) {
  //     title = data.messages[0].title;
  //     detail = data.messages[0].title;
  //   }
  // }
  // const announcementMessageFormat = {
  //   name: 'announcementMessage',
  //   level: level,
  //   title: title,
  //   detail: detail,
  //   html: {
  //     url: '',
  //   },
  // };
}

export default {
  alert,
  flash,
  handleResponseNotification,
  removeFlashMessage,
};
