class Utils {
	static matrix(rows, columns, default_value = 0) {
		return new Array(rows).fill(
			new Array(columns).fill(default_value)
		);
	}
}

export default Utils;