const hours = [];
for (let i = 0; i < 10; i += 1) {
  hours.push(`0${i}`);
}
for (let i = 10; i < 25; i += 1) {
  hours.push(`0${i}`);
}
const minutes = [];
for (let i = 0; i < 10; i += 1) {
  minutes.push(`0${i}`);
}
for (let i = 10; i < 61; i += 1) {
  minutes.push(`0${i}`);
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
    time_collect: {
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
      const arg1 = this.data.time[this.data.value[1]];
      const arg2 = this.data.datearray[this.data.value[0]];
      this.triggerEvent('setfunc', { arg2, arg1, value: this.data.value }, {});
    },
    bindChange(e) {
      const val = e.detail.value;
      const { time_collect, indexlable1, indexlable2 } = this.data;
      if (val[0] < time_collect.length) {
        this.setData({
          time: time_collect[val[0]],
        });
      } else {
        this.setData({
          time: time_collect[time_collect.length - 1],
        });
      }

      indexlable1.forEach((currentValue, index, array) => {
        array[index] = 'normal'; // eslint-disable-line
      });
      indexlable2.forEach((currentValue, index, array) => {
        array[index] = 'normal'; // eslint-disable-line
      });

      this.data.indexlable1[val[0]] = 'choiced';
      this.data.indexlable2[val[1]] = 'choiced';
      this.setData({
        indexlable1: this.data.indexlable1,
        indexlable2: this.data.indexlable2,
        value: [val[0], val[1]],
      });
    },
  },
});
