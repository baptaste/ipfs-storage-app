export const sortByDate = (arr: any[], oldest = false, limit = arr.length): any[] => {
	let result = arr.sort((a: any, b: any) => {
		if (oldest) {
			return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
		}
		return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
	})

	if (limit) {
		result = result.filter((item, i) => (i < limit ? item : null))
	}

	return result
}

export const sortByName = (arr: any[], key: string): any[] => {
	return arr.sort((a: any, b: any) => b[key].localeCompare(a[key]))
}

export const getTargetIdx = (arr: any[], targetId: string): number => {
	if (!arr) return -1

	for (let i = 0; i < arr.length; i += 1) {
		if (arr[i]._id === targetId) {
			return i
		}
	}

	return -1
}
