export default {
  props: {
    open: {
      type: Boolean,
      default: false
    },
    actions: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'success'
    },
    message: {
      type: String,
    },
    close: Function,
  },

  data() {
    return {
      color: 'green',
      icon: 'mdi-check-circle-outline'
    }
  },

  mounted() {
    this.getIconName();
  },

  computed: {
    model: {
      get() {
        return this.open;
      },
      set(value) {
        // this.model = value
        this.$emit('click', value);
      }
    }
  },

  methods: {
    getIconName() {
      if (this.type === 'success') {
        this.icon = 'mdi-check-circle-outline'
        this.color = 'green';
      } else {
        this.icon = 'mdi-close-circle-outline';
        this.color = 'red';
      }
    },

    actClose() {
      this.model = false;
    }
  }
}
