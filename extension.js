const St = imports.gi.St;
const Lang = imports.lang;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const MessageTray = imports.ui.messageTray;
const Atk = imports.gi.Atk;



//BlaBla
const indicator_name = "Dice";
let dice_button;





const Dice = new Lang.Class({
    Name: indicator_name,
    Extends: PanelMenu.Button,

    _init: function() {
        this.parent(null, indicator_name);
        this.actor.accessible_role = Atk.Role.TOGGLE_BUTTON;


        this._icon = new St.Icon({
                   icon_name: 'abc',
                   style_class: 'system-status-icon'
        });


        this.actor.add_actor(this._icon);
        this.actor.add_style_class_name('panel-status-button');
    }
});


function init(extensionMeta)
{
  let theme = imports.gi.Gtk.IconTheme.get_default();
  theme.append_search_path(extensionMeta.path + "/data");
}

function enable()
{
  dice_button = new Dice;
  Main.panel.addToStatusArea(indicator_name, dice_button);
}

function disable()
{
  dice_button.destroy();
  dice_button = null;
}
