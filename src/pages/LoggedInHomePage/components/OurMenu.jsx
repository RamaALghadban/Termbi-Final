import { useEffect, useMemo, useState } from 'react'

import { DEFAULT_RESTAURANT_ADMIN_ID } from '../../../api/constants'
import { getCategories, getProducts } from '../../../api/menu'

const MENU_TABS = ['Popular', 'Pasta', 'Salad', 'Seafood', 'Sandwiches', 'Pizza', 'Burger', 'Juice']

function normalizeList(res) {
  if (Array.isArray(res?.data)) return res.data
  if (Array.isArray(res?.data?.data)) return res.data.data
  if (Array.isArray(res?.data?.data?.data)) return res.data.data.data
  if (Array.isArray(res?.data?.products)) return res.data.products
  if (Array.isArray(res?.data?.data?.products)) return res.data.data.products
  if (Array.isArray(res?.data?.categories)) return res.data.categories
  if (Array.isArray(res?.data?.data?.categories)) return res.data.data.categories
  if (Array.isArray(res?.data?.items)) return res.data.items
  if (Array.isArray(res?.data?.data?.items)) return res.data.data.items
  if (Array.isArray(res)) return res
  return []
}

function getProductImageUrl(p) {
  const url = p?.image || p?.images?.[0] || p?.main_image || ''
  return typeof url === 'string' ? url : ''
}

function formatPrice(value) {
  const n = Number(value)
  if (!Number.isFinite(n)) return ''
  return `${Math.round(n)} $`
}

function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

function inferMenuGroup({ categoryName, productName }) {
  const c = normalizeText(categoryName)
  const p = normalizeText(productName)
  const t = `${c} ${p}`

  if (t.includes('pasta')) return 'Pasta'
  if (t.includes('salad')) return 'Salad'
  if (t.includes('seafood') || t.includes('shrimp') || t.includes('fish') || t.includes('salmon')) return 'Seafood'
  if (t.includes('burger')) return 'Burger'
  if (t.includes('sandwich') || t.includes('wrap') || t.includes('shawarma')) return 'Sandwiches'
  if (t.includes('pizza')) return 'Pizza'
  if (t.includes('juice') || t.includes('smoothie') || t.includes('drink') || t.includes('beverage')) return 'Juice'
  return ''
}

function OurMenu() {
  const [activeCategory, setActiveCategory] = useState('Popular')
  const [viewMode, setViewMode] = useState('cards')
  const [sortBy, setSortBy] = useState('name')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [popularItems, setPopularItems] = useState([])

  useEffect(() => {
    let alive = true

    const run = async () => {
      try {
        setIsLoading(true)
        setError('')

        const primary = await getCategories({
          restaurantAdminId: DEFAULT_RESTAURANT_ADMIN_ID,
          withProducts: true,
          sortBy: 'name',
          sortTerm: 'asc',
        })
        let list = normalizeList(primary)

        // Fallback: some environments might not require/accept restaurant_admin_id
        if (!list.length) {
          const fallback = await getCategories({
            withProducts: true,
            sortBy: 'name',
            sortTerm: 'asc',
          })
          list = normalizeList(fallback)
        }

        if (!alive) return
        setCategories(list)

        // Fetch all products (for grouping into UI tabs).
        try {
          const pr1 = await getProducts({
            restaurantAdminId: DEFAULT_RESTAURANT_ADMIN_ID,
            sortBy: 'name',
            sortTerm: 'asc',
          })
          let prodList = normalizeList(pr1)

          if (!prodList.length) {
            const pr2 = await getProducts({
              sortBy: 'name',
              sortTerm: 'asc',
            })
            prodList = normalizeList(pr2)
          }

          if (!alive) return
          setProducts(prodList)
        } catch {
          if (!alive) return
          setProducts([])
        }

        // Popular products are fetched separately.
        try {
          const p1 = await getProducts({
            restaurantAdminId: DEFAULT_RESTAURANT_ADMIN_ID,
            popular: 1,
            sortBy: 'name',
            sortTerm: 'asc',
          })
          let pList = normalizeList(p1)

          if (!pList.length) {
            const p2 = await getProducts({
              popular: 1,
              sortBy: 'name',
              sortTerm: 'asc',
            })
            pList = normalizeList(p2)
          }

          if (!alive) return
          setPopularItems(pList)
        } catch {
          if (!alive) return
          setPopularItems([])
        }

        if (!list.length) {
          setError('No menu categories returned from API')
        }
      } catch (e) {
        if (!alive) return
        setError(e?.message || 'Failed to load menu')
        setCategories([])
        setProducts([])
        setPopularItems([])
      } finally {
        if (!alive) return
        setIsLoading(false)
      }
    }

    run()
    return () => {
      alive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const groupedItems = useMemo(() => {
    const catNameById = new Map()
    for (const c of categories) {
      if (c && (c.id || c.id === 0)) {
        catNameById.set(String(c.id), c.name || c.title || '')
      }
    }

    const groups = {}
    for (const tab of MENU_TABS) groups[tab] = []

    const baseProducts = Array.isArray(products) ? products : []
    for (const p of baseProducts) {
      const categoryId = p?.category_id ?? p?.categoryId ?? p?.category?.id
      const categoryName =
        (categoryId || categoryId === 0) ? catNameById.get(String(categoryId)) : p?.category?.name || ''
      const group = inferMenuGroup({ categoryName, productName: p?.name })
      if (!group || !groups[group]) continue
      groups[group].push(p)
    }

    // Popular tab uses its own endpoint (do not mix with inferred groups)
    groups.Popular = Array.isArray(popularItems) ? popularItems : []

    return groups
  }, [categories, products, popularItems])

  const items = useMemo(() => {
    const base = groupedItems?.[activeCategory] || []

    const mapped = base.map((p) => ({
      id: p?.id,
      name: p?.name || '',
      description: p?.description || '',
      price: p?.price,
      image: getProductImageUrl(p),
    }))

    if (sortBy === 'price') {
      return [...mapped].sort((a, b) => Number(a.price || 0) - Number(b.price || 0))
    }
    return [...mapped].sort((a, b) => String(a.name || '').localeCompare(String(b.name || '')))
  }, [activeCategory, groupedItems, sortBy])

  return (
    <section className="w-full bg-white pb-16">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-0">
        <h2 className="text-center text-[28px] font-semibold text-[#111827] md:text-[34px]">
          Our <span className="text-[#EC2323]">Menu</span>
        </h2>
        <p className="mx-auto mt-2 max-w-[650px] text-center text-[14px] text-[#6B7280] md:text-[15px]">
          Explore our special, tasteful dishes on the Restaurant Menu!
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
          {MENU_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveCategory(tab)}
              className={`relative pb-2 text-[14px] font-medium transition-colors md:text-[15px] ${
                activeCategory === tab ? 'text-[#EC2323]' : 'text-[#9CA3AF] hover:text-[#6B7280]'
              }`}
            >
              {tab}
              {activeCategory === tab && <span className="absolute left-0 right-0 -bottom-[2px] h-[2px] bg-[#EC2323]" />}
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`h-9 rounded-md border px-4 text-[12px] font-medium ${
                viewMode === 'cards'
                  ? 'border-[#EC2323] text-[#EC2323]'
                  : 'border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              View as Cards
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`h-9 rounded-md border px-4 text-[12px] font-medium ${
                viewMode === 'list'
                  ? 'border-[#EC2323] text-[#EC2323]'
                  : 'border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              View as List
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setSortBy('name')}
              className={`h-9 rounded-md border px-4 text-[12px] font-medium ${
                sortBy === 'name'
                  ? 'border-[#EC2323] text-[#EC2323]'
                  : 'border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              Sort by Name
            </button>
            <button
              type="button"
              onClick={() => setSortBy('price')}
              className={`h-9 rounded-md border px-4 text-[12px] font-medium ${
                sortBy === 'price'
                  ? 'border-[#EC2323] text-[#EC2323]'
                  : 'border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              Sort by Price
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="h-9 rounded-md border border-[#E5E7EB] px-6 text-[12px] font-medium text-[#6B7280] hover:text-[#111827]"
            >
              Download Menu
            </button>
          </div>
        </div>

        <div className="mt-10">
          {isLoading && <div className="py-10 text-center text-[13px] text-[#6B7280]">Loading menu…</div>}
          {!isLoading && error && <div className="py-10 text-center text-[13px] text-[#EC2323]">{error}</div>}

          {!isLoading && !error && viewMode === 'cards' && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[1fr_180px] overflow-hidden rounded-xl bg-[#FFF6F6]"
                >
                  <div className="p-6">
                    <div className="text-[13px] font-semibold text-[#111827]">{item.name}</div>
                    <div className="mt-3 text-[11px] leading-5 text-[#6B7280]">{item.description}</div>

                    <div className="mt-6 flex items-center justify-between">
                      <div className="text-[14px] font-semibold text-[#EC2323]">{formatPrice(item.price)}</div>
                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-md border border-[#FBE0E0] bg-white text-[#EC2323] hover:bg-[#FDECEC]"
                        aria-label="Add to cart"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M6 6h15l-2 9H7L6 6Z"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6 6 5 3H2"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM18 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="h-full w-full bg-white">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full bg-[#E5E7EB]" />
                    )}
                  </div>
                </div>
              ))}

              {!items.length && <div className="py-10 text-center text-[13px] text-[#6B7280]">No items</div>}
            </div>
          )}

          {!isLoading && !error && viewMode === 'list' && (
            <div className="overflow-hidden rounded-xl border border-[#F3F4F6]">
              <div className="grid grid-cols-12 bg-[#FAFAFA] px-5 py-3 text-[12px] font-medium text-[#6B7280]">
                <div className="col-span-6">Item</div>
                <div className="col-span-5">Description</div>
                <div className="col-span-1 text-right">Price</div>
              </div>
              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-12 items-center px-5 py-4 text-[12px]">
                  <div className="col-span-6 font-semibold text-[#111827]">{item.name}</div>
                  <div className="col-span-5 text-[#6B7280]">{item.description}</div>
                  <div className="col-span-1 text-right font-semibold text-[#EC2323]">{formatPrice(item.price)}</div>
                </div>
              ))}
              {!items.length && <div className="py-10 text-center text-[13px] text-[#6B7280]">No items</div>}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default OurMenu
