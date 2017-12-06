'use babel';

import IsaacBlumWordCountView from './isaac-blum-word-count-view';
import { CompositeDisposable } from 'atom';

export default {

  isaacBlumWordCountView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.isaacBlumWordCountView = new IsaacBlumWordCountView(state.isaacBlumWordCountViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.isaacBlumWordCountView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'isaac-blum-word-count:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.isaacBlumWordCountView.destroy();
  },

  serialize() {
    return {
      isaacBlumWordCountViewState: this.isaacBlumWordCountView.serialize()
    };
  },

  toggle() {
    console.log('IsaacBlumWordCount was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
