/*
 * greeter.js
 *
 * aqua-lightdm-webkit-theme is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License,
 * or any later version.
 *
 * aqua-lightdm-webkit-theme is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * The following additional terms are in effect as per Section 7 of the license:
 *
 * The preservation of all legal notices and author attributions in
 * the material or in the Appropriate Legal Notices displayed
 * by works containing it is required.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* Globals */

let time_remaining = 0;
let selected_user = null;
let valid_image = /.*\.(png|svg|jpg|jpeg|bmp)$/i;

/* Callback API. Called by the webkit greeeter */

/*
 * called when the greeter asks to show a login prompt for a user
 * @param {str} text to show in prompt
 */
function show_prompt(text) {
  const password_container = document.querySelector("#password_container");
  const password_entry = document.querySelector("#password_entry");
  const background = document.querySelector("#background");
  if (!isVisiblePass(password_container)) {
    const users = document.querySelectorAll(".user");
    const user_node = document.querySelector("#" + selected_user);
    const rect = user_node.getClientRects()[0];
    const parentRect = user_node.parentElement.getClientRects()[0];
    const center = parentRect.width / 2;

    let left = center - rect.width / 2 - rect.left;

    if (left < 5 && left > -5) {
      left = 0;
    }

    for (let user of users) {
      setVisible(user, user.id === selected_user);
      user.style.left = left;
    }

    setVisiblePass(password_container, true);
    password_entry.placeholder = text.replace(":", "");

    const back = document.querySelector("#back");
    const enter = document.querySelector("#enter");

    back.onclick = show_users;
    setVisible(back, true);

    enter.onclick = provide_secret;
    setVisible(enter, true);
  }

  background.classList.add("blurred");
  password_entry.value = "";
  password_entry.focus();
}

/*
 * called when the greeter asks to show a message
 * @param {str} text to show in message
 */
function show_message(text) {
  const message = document.querySelector("#message_content");

  message.innerHTML = text;

  if (text) {
    document.querySelector("#message").classList.remove("hidden");
  } else {
    document.querySelector("#message").classList.add("hidden");
  }

  message.classList.remove("error");
}

/*
 * called when the greeter asks to show an error
 * @param {str} text to show in error
 */
function show_error(text) {
  show_message(text);
  const message = document.querySelector("#message_content");

  message.classList.add("error");
}

/*
 * called when the greeter is finished the authentication request
 */
function authentication_complete() {
  if (lightdm.is_authenticated) {
    lightdm.login(lightdm.authentication_user, lightdm.default_session);
  } else {
    const password_container = document.querySelector("#password_container");

    password_container.classList.add("apply_shake");
    password_container.addEventListener("animationend", err => {
      password_container.classList.remove("apply_shake");
    });
    start_authentication(selected_user);
  }
}

/*
 * called when the greeter wants us to perform a timed login
 * @param {any} user to log in
 */
function timed_login(user) {
  lightdm.login(lightdm.timed_login_user);
}

/* Implementation */

/*
 * begin authenticating the given user
 * @param {str} name of user to authenticate
 */
function start_authentication(username) {
  if (typeof lightdm._user === null) {
    try {
      lightdm.cancel_authentication();
    } catch (e) {
      console.log(e);
    }
  }
  lightdm.cancel_timed_login();
  selected_user = username;
  try {
    lightdm.start_authentication(username);
  } catch (e) {
    console.log(e);
  }
}

/*
 * provide password entered by user to lightdm
 */
function provide_secret() {
  entry = document.querySelector("#password_entry");
  lightdm.provide_secret(entry.value);
}

/*
 * enumerate available sessions
 */
function initialize_sessions() {
  const template = document.querySelector("#session_template");
  const container = session_template.parentElement;

  container.removeChild(template);

  for (let session of lightdm.sessions) {
    const label = s.querySelector(".session_label");

    let s = template.cloneNode(true);

    s.id = "session_" + session.key;

    let radio = s.querySelector("input");

    label.innerHTML = session.name;
    radio.value = session.key;

    if (session.key === lightdm.default_session.key) {
      radio.checked = true;
    }

    session_container.appendChild(s);
  }
}

/*
 * set visibilty of users
 */
function show_users() {
  const users = document.querySelectorAll(".user");
  const background = document.querySelector("#background");
  for (let user of users) {
    setVisible(user, true);
    user.style.left = 0;
  }
  setVisible(document.querySelector("#back"), false);
  setVisible(document.querySelector("#enter"), false);
  setVisiblePass(document.querySelector("#password_container"), false);
  selected_user = null;
  background.classList.remove("blurred");
}

/*
 * begin authenticating selected user
 * @param {any} click event
 */
function user_clicked(event) {
  if (selected_user !== null) {
    selected_user = null;
    lightdm.cancel_authentication();
    show_users();
  } else {
    selected_user = event.currentTarget.id;
    start_authentication(event.currentTarget.id);
  }

  show_message("");
  event.stopPropagation();

  return false;
}

/*
 * set visibility of the given element
 * @param {element} element to change visibility of
 * @param {bool} make element visible or not
 */
function setVisible(element, visible) {
  if (visible) {
    element.classList.remove("hidden");
  } else {
    element.classList.add("hidden");
  }
}

/*
 * set visibility of the given password field
 * @param {element} password field to change visibility of
 * @param {bool} make password field visible or not
 */
function setVisiblePass(element, visible) {
  if (visible) {
    element.classList.remove("passhidden");
  } else {
    element.classList.add("passhidden");
  }
}

/*
 * get given element's visibilty
 * @param {any} element to check
 * @return {bool} return true if visible
 */
function isVisible(element) {
  return !element.classList.contains("hidden");
}

/*
 * get given password field's visibilty
 * @param {any} password field to check
 * @return {bool} return true if visible
 */
function isVisiblePass(element) {
  return !element.classList.contains("passhidden");
}

/*
 * set default avatar for user if none is found
 * @param {any} err user to set avatar
 */
function on_image_error(err) {
  err.currentTarget.src = "resources/img/avatar.svg";
}

/*
 * enable keyboard navigation
 * @param {any} key press event to handle
 */
function key_press_handler(event) {
  let action = null;
  switch (event.code) {
    case "Enter":
    case "Space":
      action =
        selected_user != null
          ? provide_secret
          : start_authentication(lightdm.users[0].name);

      event.preventDefault();
      event.stopPropagation();
      break;
    case "Escape":
      action = show_users;
      break;
  }
  if (action instanceof Function) {
    action();
  }
}

/* Initialization */

function initialize() {
  initialize_users();
  initialize_clock();
  document.addEventListener("keydown", key_press_handler);
}

function initialize_users() {
  const template = document.querySelector("#user_template");
  const parent = template.parentElement;

  parent.removeChild(template);

  for (let user of lightdm.users) {
    userNode = template.cloneNode(true);
    const image = userNode.querySelectorAll(".user_image")[0];
    const name = userNode.querySelectorAll(".user_name")[0];

    name.innerHTML = user.display_name;

    if (user.image) {
      image.src = user.image;
      image.onerror = on_image_error;
    } else {
      image.src = "resources/img/avatar.svg";
    }

    userNode.id = user.name;
    userNode.onclick = user_clicked;
    parent.appendChild(userNode);
  }
  setTimeout(show_users, 400);
}

function initialize_clock() {
  const time = document.querySelector("#time");

  time.innerHTML = theme_utils.get_current_localized_time();
  setInterval(
    () => (time.innerHTML = theme_utils.get_current_localized_time()),
    60000
  );
}

function add_action(id, name, image, click_handler, template, parent) {
  action_node = template.cloneNode(true);
  action_node.id = "action_" + id;
  img_node = action_node.querySelectorAll(".action_image")[0];
  label_node = action_node.querySelectorAll(".action_label")[0];
  label_node.innerHTML = name;
  img_node.src = image;
  action_node.onclick = click_handler;
  parent.appendChild(action_node);
}
