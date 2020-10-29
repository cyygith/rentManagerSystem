import { baseUrl } from '@/config/env'
import axios from './http'
/**
 * 系统管理字典模块
 */

const dictApi = {
	dict: {
		yesNo: {
			'0': '否',
			'1': '是'
		},
		okNo: {
			'0': '不同意',
			'1': '同意'
		},
		useNo: {
			'0': '禁用',
			'1': '启用'
		},
		typeCodeCd: {
			yesNo: 'yesNo',
			okNo: 'okNo',
			useNo: 'useNo',
			waterCloseType: 'waterCloseType',
			payType: 'payType'
		}
	},
	// 根据字典类型获取字典值
	getDictByType(option) {
		let typeCode = option.typeCode;
		if (!typeCode) reject();

		if (this.getDictCache(typeCode)==null) {//如果缓存中没有则不获取
			let param = new URLSearchParams();
			param.append("typeCode", typeCode);
			return axios.post(`${baseUrl}/sysDictValue/getDictByType`, param).then((res) => {
				if (res.code == "0") {
					let item = {};
					res.data.forEach((it) => {
						item[it.code] = it.codeValue;
					})
					this.setCacheDict(typeCode, item);
					return new Promise((resolve, reject) => {
						resolve(item);
					});
				} else {
					this.$alert('获取字典值失败', '提示信息');
				}
			});
		} else {
			return new Promise((resolve, reject) => {
				let item = this.getDictCache(typeCode);
				resolve(item);
			});
		}
	},
	formatRemote(typeCode, keyValue) {
		if (!typeCode) return new Promise();
		if (this.getDictCache(typeCode) == null) {//如果缓存中没有则不获取
			let param = new URLSearchParams();
			param.append("typeCode", typeCode);
			return axios.post(`${baseUrl}/sysDictValue/getDictByType`, param).then((res) => {
				if (res.code == "0") {
					let item = {};
					res.data.forEach((it) => {
						item[it.code] = it.codeValue;
					})
					this.setCacheDict(typeCode, item);
					let p = new Promise((resolve, reject) => {
						resolve(item[keyValue]);
					});
					return p;
				} else {
					this.$alert('获取字典值失败', '提示信息');
				}
			});
		} else {
			return new Promise((resolve, reject) => {
				let item = this.getDictCache(typeCode);
				resolve(item[keyValue]);
			});
		}
	},
	setCacheDict(typeCode, cache) {
		if (cache) {
			this.dict[typeCode] = cache;
		}
	},
	getDictCache(typeCode) {
		return this.dict[typeCode];
	}

}

export {
	dictApi
}
