<template>
  <div id="app">

    <router-view/>
    <van-button type="default">默认按钮</van-button>
<van-button type="primary">主要按钮</van-button>
<van-button type="info">信息按钮</van-button>
<van-button type="warning">警告按钮</van-button>
<van-button type="danger">危险按钮</van-button>
<div class="box"></div>
  </div>
</template>

<style lang="less">
 .box{
   width: 750px;
   height: 60px;
   background-color: pink;
 }
</style>
