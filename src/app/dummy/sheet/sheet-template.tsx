"use client"

import { useQuery } from "@tanstack/react-query"
import MultiSelectItemBottomSheet from "@/src/common/components/modal/filter-select/multiple-select-bottom-sheet"
import SingleSelectItemBottomSheet from "@/src/common/components/modal/filter-select/single-select-item-bottom-sheet"
import useSearchParamsFilter from "@/src/common/hooks/use-filter"
import { modalManager } from "@/src/common/module/modal-manager"

type Item = {
  id: number
  title: string
}

type SelectedFilters = {
  genre?: Item
  categories?: Item[]
}

const SheetTemplate = () => {
  const { filters, setFilters, resetFilters } = useSearchParamsFilter<SelectedFilters>()

  useQuery({
    queryKey: [filters],
    queryFn: async () => {
      return {
        test: "data",
      }
    },
  })

  const singleModalOpen = () => {
    modalManager.open({
      Component: SingleSelectItemBottomSheet,
      componentProps: {
        title: "음악장르",
        handleSubmit: (data: Item) => setFilters({ genre: data }),
        defaultData: filters.genre,
        items: [
          { id: 1, title: "Jazz" },
          { id: 2, title: "Rock" },
          { id: 3, title: "Hip-Hop" },
          { id: 4, title: "Pop" },
        ],
        renderItem: ({ active, item }) => (
          <div className="flex justify-between">
            <p>{item.title}</p>
            {active && "✔"}
          </div>
        ),
      },
      id: "select-genre",
    })
  }

  const multipleModalOpen = () => {
    modalManager.open({
      Component: MultiSelectItemBottomSheet,
      componentProps: {
        title: "카테고리",
        handleSubmit: (data: Item[]) => setFilters({ categories: data }),
        defaultData: filters.categories ?? [],
        items: [
          { id: 1, title: "전자음악" },
          { id: 2, title: "클래식" },
          { id: 3, title: "힙합" },
          { id: 4, title: "발라드" },
        ],
        renderItem: ({ active, item }) => (
          <div className="flex justify-between">
            <p>{item.title}</p>
            {active && "✔"}
          </div>
        ),
      },
      id: "select-categories",
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <button onClick={singleModalOpen}>장르 선택</button>
        <div>선택된 장르: {filters.genre?.title ?? "없음"}</div>
      </div>
      <div className="flex flex-col">
        <button onClick={multipleModalOpen}>카테고리 선택</button>
        <div>
          선택된 카테고리:{" "}
          {filters.categories?.length
            ? filters.categories.map(selected => <span key={selected.id}>{selected.title}, </span>)
            : "없음"}
        </div>
      </div>
      <button onClick={() => resetFilters()}>초기화</button>
    </div>
  )
}

export default SheetTemplate
