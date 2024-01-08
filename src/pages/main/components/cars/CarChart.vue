<template>
  <div>
    <apexchart
        type="line"
        :options="options"
        :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  props:['options','series'],
};
</script>