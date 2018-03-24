const Atk = imports.gi.Atk;
const GLib = imports.gi.GLib;
const Lang = imports.lang;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;
const PanelMenu = imports.ui.panelMenu;
const St = imports.gi.St;

const indicator_name = "Dice";

let rolling_now = false;

const Dice = new Lang.Class({
  Name: indicator_name,
  Extends: PanelMenu.Button,

  _init: function() {
    this.parent(null, indicator_name);
    this.actor.accessible_role = Atk.Role.BUTTON;

    this.left_dice = new St.Icon({
      icon_name: this.get_random(),
      style_class: 'system-status-icon dice-attr'
    });
    this.right_dice = new St.Icon({
      icon_name: this.get_random(),
      style_class: 'system-status-icon dice-attr'
    });

    this.box_container = new St.BoxLayout();
    this.box_container.add_actor(this.left_dice);
    this.box_container.add_actor(this.right_dice);

    this.actor.add_actor(this.box_container);
    this.actor.add_style_class_name('panel-status-button');
    this.actor.connect('button-press-event', Lang.bind(this, this.roll));
  },

  roll: function() {
    let that = this;
    if(rolling_now == false) {
      rolling_now = true;
      var roll_num = 2;
      that.toggleState();
      this.Timeout = GLib.timeout_add_seconds(GLib.PRIORITY_DEFAULT, 1,
      function () {
        if(roll_num == 0) {
          rolling_now = false;
          return false;
        } else {
          that.toggleState();
          roll_num--;
          return true;
        }
      });
    }
  },

  toggleState: function() {
    this.left_dice.icon_name = this.get_random();
    this.right_dice.icon_name = this.get_random();
  },

  get_random: function() {
    return Math.floor((Math.random() * 6) + 1).toString();
  }
});

let dice_button;

function init(extensionMeta)
{
  let theme = imports.gi.Gtk.IconTheme.get_default();
  theme.append_search_path(extensionMeta.path + "/data");
}

function enable()
{
  dice_button = new Dice();
  Main.panel.addToStatusArea(indicator_name, dice_button);
}

function disable()
{
  dice_button.destroy();
  dice_button = null;
}
