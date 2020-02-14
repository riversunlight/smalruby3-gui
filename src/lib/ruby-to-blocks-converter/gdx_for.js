/* global Opal */
import _ from 'lodash';

/**
 * GdxFor converter
 */

const GdxForConverter = {
    // eslint-disable-next-line no-unused-vars
    onSend: function (receiver, name, args, rubyBlockArgs, rubyBlock) {
        let block;
        if ((this._isSelf(receiver) || receiver === Opal.nil) && !rubyBlock) {
            switch (name) {
            case 'gdx_for_tilted?':
                block = this._createBlock('gdxfor_isTilted', 'value');
                this._addInput(block, 'TILT', this._createFieldBlock('gdxfor_menu_tiltAnyOptions', 'tiltAnyOptions', args[0]));
                break;
            case 'gdx_for_tilt_angle':
                block = this._createBlock('gdxfor_getTilt', 'value');
                this._addInput(block, 'TILT', this._createFieldBlock('gdxfor_menu_tiltOptions', 'tiltOptions', args[0]));
                break;
            case 'gdx_for_acceleration':
            case 'gdx_for_spin_speed':
                if (args.length === 1) {
                    if (name === 'gdx_for_acceleration'){
                        block = this._createBlock('gdxfor_getAcceleration', 'value');
                    } else {
                        block = this._createBlock('gdxfor_getSpinSpeed', 'value');
                    }
                    this._addInput(block, 'DIRECTION', this._createFieldBlock('gdxfor_menu_axisOptions', 'axisOptions', args[0]));
                } 
                break;
            case 'gdx_for_force':
            case 'gdx_for_falling?':
                if (name === 'gdx_for_force'){
                    block = this._createBlock('gdxfor_getForce', 'value');
                } else {
                    block = this._createBlock('gdxfor_isFreeFalling', 'value');
                }
                break;
            }
        } else if (this._isSelf(receiver) || receiver === Opal.nil) {
            switch (args[0].value) {
            case 'gdx_for_gesture':
                block = this._createBlock('gdxfor_whenGesture', 'hat');
                this._addInput(block, 'GESTURE', this._createFieldBlock('gdxfor_menu_gestureOptions', 'gestureOptions', args[1]));
                break;
            case 'gdx_force_sensor':
                block = this._createBlock('gdxfor_whenForcePushedOrPulled', 'hat');
                this._addInput(block, 'PUSH_PULL', this._createFieldBlock('gdxfor_menu_pushPullOptions', 'pushPullOptions', args[1]));
                break;
            case 'gdx_for_tilted':
                block = this._createBlock('gdxfor_whenTilted', 'hat');
                this._addInput(block, 'TILT', this._createFieldBlock('gdxfor_menu_tiltAnyOptions', 'tiltAnyOptions', args[1]));
                break;
            }
        }
        return block;
    }
};

export default GdxForConverter;
