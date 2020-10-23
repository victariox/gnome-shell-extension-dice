const Atk = imports.gi.Atk;
const GLib = imports.gi.GLib;
const Lang = imports.lang;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;
const PanelMenu = imports.ui.panelMenu;
const St = imports.gi.St;
const Gio = imports.gi.Gio;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

const indicator_name = "Dice";

let rolling_now = false;

const Dice = new Lang.Class({
  Name: indicator_name,
  Extends: PanelMenu.Button,


 _getIcon: function(number){
	 return Gio.icon_new_for_string(Me.dir.get_child('data').get_path() + "/" + number + ".svg");
 },

  _init: function() {
    this.parent(null, indicator_name);
    this.actor.accessible_role = Atk.Role.BUTTON;

    this.left_dice = new St.Icon({
      style_class: 'system-status-icon dice-attr'
    });
    this.left_dice.gicon = this._getIcon(this.get_random());

    this.right_dice = new St.Icon({
      style_class: 'system-status-icon dice-attr'
    });
    this.right_dice.gicon = this._getIcon(this.get_random());

    this.box_container = new St.BoxLayout();
    this.box_container.add_actor(this.left_dice);
    this.box_container.add_actor(this.right_dice);

    this.actor.add_actor(this.box_container);
    this.actor.add_style_class_name('panel-status-button');
    this.actor.connect('button-press-event', Lang.bind(this, this.roll));
  },

  rollLeft: function(){
    this.left_dice.gicon = this._getIcon(this.get_random()); 
  },

  rollRight: function(){
    rolling_now = false;
    this.right_dice.gicon = this._getIcon(this.get_random()); 
  },

  roll: function() {
    if(! rolling_now){
      rolling_now = true;
      this.rollLeft(); 
      Mainloop.timeout_add(500,() => this.rollRight());
    }
  },

  get_random: function() {
    return Math.floor((Math.random() * 6) + 1).toString();
  }
});

let dice_button;

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

function init() {
}
