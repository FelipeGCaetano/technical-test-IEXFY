export interface PaginationResponse<T> {
    currentPage: number,
    totalPages: number,
    totalItems: number,
    items: T[],
}

export function paginateItens<T>(page: number, limit: number, itens: T[]): PaginationResponse<T> {
    const startIndex = (page - 1) * limit

    const endIndex = startIndex + limit

    const paginatedItems = itens.slice(startIndex, endIndex)

    const totalPages = Math.ceil(itens.length / limit)

    return {
        currentPage: page,
        totalPages,
        totalItems: itens.length,
        items: paginatedItems,
    }
}