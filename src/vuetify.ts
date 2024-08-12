import 'material-design-icons-iconfont/dist/material-design-icons.css';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

export const vuetify = createVuetify({
	icons: {
		defaultSet: 'mdi',
		aliases,
		sets: {
			mdi,
		},
	},
	defaults: {
		VBtnToggle: {
			color: 'rgb(0, 1, 76)',
			elevation: 1,
		},
		VCheckbox: {
			color: 'rgb(0, 1, 76)',
		},
	},
});
