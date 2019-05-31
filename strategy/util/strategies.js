/* ES6：策略模式实现 */
const strategies = {
    isNonEmpty(value, errorMsg) {
        if (value === '') {
            return errorMsg
        }
    },
    minLength(value, length, errorMsg) {
        if (value.length < length) {
            return errorMsg
        }
    },
    isMobile(value, errorMsg) {
        if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
            return errorMsg
        }
    }
}

class Validator {
    constructor() {
        this.cache = []
    }
    // 单挑验证规则
    add(dom, rule, errorMsg) {
        let arr = rule.split(':')
        this.cache.push(function () {
            let strategy = arr.shift()
            arr.unshift(dom.value)
            arr.push(errorMsg)
            return strategies[strategy].apply(dom, arr)
        })
    }
    addMore(dom, rules) {
        let cache = this.cache,
            len = rules.length
        for (let i = 0; i < len; i++) {
            let rule = rules[i];
            (function (rule) {
                let strategyArr = rule.strategy.split(':'),
                    errorMsg = rule.errorMsg
                cache.push(function () {
                    let strategy = strategyArr.shift()
                    strategyArr.unshift(dom.value)
                    strategyArr.push(errorMsg)
                    return strategies[strategy].apply(dom, strategyArr)
                })
            })(rule)
        }
    }
    start() {
        let len = this.cache.length,
            cache = this.cache
        for (let i = 0; i < len; i++) {
            let msg = cache[i]()
            if (msg) {
                return msg
            }
        }
    }
}


/* 
// 创建执行环境
function Validator() {
    console.log(123)
    this.cache = []
}
Validator.prototype.add = function (dom, rule, errorMsg) {
    let arr = rule.split(':')
    this.cache.push(function () {
        let strategy = arr.shift()
        arr.unshift(dom.value)
        arr.push(errorMsg)
        return strategies[strategy].apply(dom, arr)
    })
}
Validator.prototype.start = function () {
    let len = this.cache.length,
        cache = this.cache
    for (let i = 0; i < len; i++) {
        let msg = cache[i]()
        if (msg) {
            return msg
        }
    }
}
Validator.prototype.addMore = function (dom, rules) {
    let len = rules.length,
        cache = this.cache
    for (let i = 0; i < len; i++) {
        let rule = rules[i];
        (function (rule) {
            let strategyArr = rule.strategy.split(':'),
                errorMsg = rule.errorMsg
            cache.push(function () {
                let strategy = strategyArr.shift()
                strategyArr.unshift(dom.value)
                strategyArr.push(errorMsg)
                return strategies[strategy].apply(dom, strategyArr)
            })
        })(rule)
    }
}
 */