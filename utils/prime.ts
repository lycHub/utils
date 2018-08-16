/*
* 判断obj1和obj2是否完全相等
* */
function equals(obj1: any, obj2: any, field?: string): boolean {
    if (field)
        return (this.resolveFieldData(obj1, field) === this.resolveFieldData(obj2, field));
    else
        return this.equalsByValue(obj1, obj2);
}

function equalsByValue(obj1: any, obj2: any, visited?: any[]): boolean {
    if (obj1 == null && obj2 == null) {
        return true;
    }
    if (obj1 == null || obj2 == null) {
        return false;
    }

    if (obj1 == obj2) {
        return true;
    }

    if (typeof obj1 == 'object' && typeof obj2 == 'object') {
        if (visited) {
            if (visited.indexOf(obj1) !== -1) return false;
        } else {
            visited = [];
        }
        visited.push(obj1);

        for (var p in obj1) {
            if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) {
                return false;
            }

            switch (typeof (obj1[p])) {
                case 'object':
                    if (!this.equalsByValue(obj1[p], obj2[p], visited)) return false;
                    break;

                case 'function':
                    if (typeof (obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString())) return false;
                    break;

                default:
                    if (obj1[p] != obj2[p]) return false;
                    break;
            }
        }

        for (var p in obj2) {
            if (typeof (obj1[p]) == 'undefined') return false;
        }

        delete obj1._$visited;
        return true;
    }

    return false;
}

function resolveFieldData(data: any, field: any): any {
    if(data && field) {
        if (this.isFunction(field)) {
            return field(data);
        }
        else if(field.indexOf('.') == -1) {
            return data[field];
        }
        else {
            let fields: string[] = field.split('.');
            let value = data;
            for(let i = 0, len = fields.length; i < len; ++i) {
                if (value == null) {
                    return null;
                }
                value = value[fields[i]];
            }
            return value;
        }
    }
    else {
        return null;
    }
}

function isFunction(obj: any): boolean {
    return !!(obj && obj.constructor && obj.call && obj.apply);
}


/*
* 将数组某元素从from剪切到to
*
* */

function reorderArray(value: any[], from: number, to: number) {
    let target: number;
    if(value && (from !== to)) {
        // if(to >= value.length) {
        //     target = to - value.length;
        //     while((target--) + 1) {
        //         value.push(undefined);
        //     }
        // }
        value.splice(to, 0, value.splice(from, 1)[0]);
    }
}