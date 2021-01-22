/**
数据验证（表单验证）
来自 grace.hcoder.net 
作者 hcoder 深海
*/
module.exports = {
	error: '',
	/**
	 * 检查器
	 * 
	 * 规则： 
	 * - name: 选项名称
	 * - checkType: 检查类型
	 * - checkRule: 检查规则
	 * - errorMsg: 错误说明
	 * @param {*} data 
	 * @param {{
	 *   name: string;
	 *   checkType: 'string'|'int'|'between'|'betweenD'|'betweenF'|'same'|'notsame'|'email'|'phoneno'|'zipcode'|'reg'|'in'|'notnull';
	 *   checkRule: string;
	 *   errorMsg: string;
	 * }[]} rule 
	 */
	check: function (data, rule) {
		for (let i = 0; i < rule.length; i++) {
			if (!rule[i].checkType || !rule[i].name || !rule[i].errorMsg) return true;
			if (!data[rule[i].name]) {
				this.error = rule[i].errorMsg;
				return false;
			}
			switch (rule[i].checkType) {
				case 'string':
					if (!new RegExp(`^.{${rule[i].checkRule}}$`).test(data[rule[i].name])) {
						this.error = rule[i].errorMsg;
						return false;
					}
					break;
				case 'int':
					if (!new RegExp(`^(-[1-9]|[1-9])[0-9]{${rule[i].checkRule}}$`).test(data[rule[i].name])) {
						this.error = rule[i].errorMsg;
						return false;
					}
					break;
				case 'between': {
					if (!this.isNumber(data[rule[i].name])) {
						this.error = rule[i].errorMsg;
						return false;
					}
					let [min, max] = rule[i].checkRule.split(',');
					if (data[rule[i].name] > Number(max) || data[rule[i].name] < Number(min)) {
						this.error = rule[i].errorMsg;
						return false;
					}
				} break;
				case 'betweenD': {
					if (!/^-?[1-9][0-9]?$/.test(data[rule[i].name])) {
						this.error = rule[i].errorMsg;
						return false;
					}
					let [min, max] = rule[i].checkRule.split(',');
					if (data[rule[i].name] > Number(max) || data[rule[i].name] < Number(min)) {
						this.error = rule[i].errorMsg;
						return false;
					}
				} break;
				case 'betweenF': {
					if (!/^-?[0-9][0-9]?.+[0-9]+$/.test(data[rule[i].name])) {
						this.error = rule[i].errorMsg;
						return false;
					}
					let [min, max] = rule[i].checkRule.split(',');
					if (data[rule[i].name] > Number(max) || data[rule[i].name] < Number(min)) {
						this.error = rule[i].errorMsg;
						return false;
					}
				} break;
				case 'same':
					if (data[rule[i].name] != rule[i].checkRule) {
						this.error = rule[i].errorMsg;
						return false;
					}
					break;
				case 'notsame':
					if (data[rule[i].name] == rule[i].checkRule) {
						this.error = rule[i].errorMsg;
						return false;
					}
					break;
				case 'email':
					if (!/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(data[rule[i].name])) {
						this.error = rule[i].errorMsg;
						return false;
					}
					break;
				case 'phoneno':
					if (!/^1[0-9]{10,10}$/.test(data[rule[i].name])) {
						this.error = rule[i].errorMsg;
						return false;
					}
					break;
				case 'zipcode':
					if (!/^[0-9]{6}$/.test(data[rule[i].name])) {
						this.error = rule[i].errorMsg;
						return false;
					}
					break;
				case 'reg':
					if (!new RegExp(rule[i].checkRule).test(data[rule[i].name])) {
						this.error = rule[i].errorMsg;
						return false;
					}
					break;
				case 'in':
					if (rule[i].checkRule.indexOf(data[rule[i].name]) == -1) {
						this.error = rule[i].errorMsg;
						return false;
					}
					break;
				case 'notnull':
					if (data[rule[i].name] == null || data[rule[i].name].length < 1) {
						this.error = rule[i].errorMsg;
						return false;
					}
					break;
			}
		}
		return true;
	},
	isNumber: function (checkVal) {
		return /^-?[1-9][0-9]?.?[0-9]*$/.test(checkVal);
	}
}