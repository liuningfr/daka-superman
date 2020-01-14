const hours = [];
for (let i = 0; i < 10; i += 1) {
  hours.push(`0${i}`);
}
for (let i = 10; i < 24; i += 1) {
  hours.push(`${i}`);
}
const minutes = [];
for (let i = 0; i < 10; i += 1) {
  minutes.push(`0${i}`);
}
for (let i = 10; i < 60; i += 1) {
  minutes.push(`${i}`);
}

Component({
  properties: {
    visiable: {
      type: Boolean,
      value: false,
    },
    hours: {
      type: Array,
      value: hours,
    },
    minutes: {
      type: Array,
      value: minutes,
    },
    value: {
      type: Array,
      value: [],
    },
    bottom: {
      type: Number,
      value: 0,
    },
  },

  data: {
    visiablenew: true,
    indexlable1: [],
    indexlable2: [],
  },

  methods: {
    donothing() {
    },
    cancel() {
      this.setData({
        visiablenew: false,
      });
      setTimeout(() => {
        this.setData({
          visiable: false,
          visiablenew: true,
        });
      }, 200);
    },
    confirm() {
      this.cancel();
      this.triggerEvent('setfunc', { value: this.data.value });
    },
    bindChange(e) {
      const val = e.detail.value;
      const { indexlable1, indexlable2 } = this.data;

      indexlable1.forEach((currentValue, index, array) => {
        array[index] = 'normal'; // eslint-disable-line
      });
      indexlable2.forEach((currentValue, index, array) => {
        array[index] = 'normal'; // eslint-disable-line
      });

      indexlable1[val[0]] = 'choiced';
      indexlable2[val[1]] = 'choiced';

      this.setData({
        indexlable1: this.data.indexlable1,
        indexlable2: this.data.indexlable2,
        value: [val[0], val[1]],
      });
    },
  },
});
