<template>
  <div id="alter">
    <p>{{showAlterMessage}}</p>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  computed:{
    ...mapState(['showAlterMessage']),
  },
  methods: {
    ...mapMutations(["changeShowAlter"]),
  },
  mounted() {
    setTimeout(() => {
      this.changeShowAlter({code:0,message:''});
    }, 2500);
  },
};
</script>
<style lang='less' scoped>
#alter {
  position: fixed;
  z-index: 3;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  p {
    text-align: center;
    padding: 5px 20px;
    border-radius: 3px;
    background: linear-gradient(45deg, rgb(250, 174, 59), rgb(255, 105, 0));
    color: white;
  }
}
</style>