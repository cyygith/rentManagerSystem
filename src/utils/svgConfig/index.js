import Vue from 'vue';
import SvgIcon from '@/components/svg/svg.vue';

Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./../../../static/svg/', true, /\.svg$/)
requireAll(req)