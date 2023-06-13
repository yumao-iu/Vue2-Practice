<template>
  <div style="font-size: 25px">十分抱歉,{{ message }}</div>
</template>
<script>
export default {
  props: ["message"],

  mounted() {
    !this.message
      ? (this.message = "这是自定义错误页面🤔")
      : (name = "阳光彩虹小白马");
    document.title = "阳光彩虹小白马-404";
  },
};
</script>