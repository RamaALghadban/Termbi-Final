import ProfileLayout from './ProfileLayout'

const reviews = [
  {
    id: 'r1',
    date: '20-09-2024',
    text: 'A delicious and beautifully presented dish that just needs a little salt to be perfect.',
    rating: 4,
  },
  {
    id: 'r2',
    date: '30-08-2024',
    text: 'Delicious dish and good service but it has a lot of hot spices which makes it difficult to eat.',
    rating: 3,
  },
  {
    id: 'r3',
    date: '28-08-2024',
    text: "The taste is bad and the vegetables are not fresh, I don't want to eat this dish again.",
    rating: 2,
  },
]

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, idx) => (
        <span key={idx} className={idx < rating ? 'text-amber-400' : 'text-[#E5E7EB]'}>
          ★
        </span>
      ))}
    </div>
  )
}

function MyReviews() {
  return (
    <ProfileLayout activeId="reviews" crumb="My Reviews" title="My Reviews">
      <div className="space-y-6">
        {reviews.map((r) => (
          <div key={r.id} className="flex items-start justify-between gap-6 rounded-xl border border-[#F3F4F6] bg-[#FAFAFA] p-6">
            <div className="flex items-start gap-5">
              <div className="h-16 w-16 rounded-lg bg-[#E5E7EB]" />
              <div>
                <Stars rating={r.rating} />
                <p className="mt-3 max-w-[520px] text-[13px] leading-6 text-[#6B7280]">{r.text}</p>
              </div>
            </div>
            <div className="text-[12px] text-[#9CA3AF]">{r.date}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        <button type="button" className="h-7 w-7 rounded-sm bg-[#EC2323] text-[12px] text-white">
          1
        </button>
        <button type="button" className="h-7 w-7 rounded-sm border border-[#E5E7EB] text-[12px] text-[#6B7280]">
          2
        </button>
        <button type="button" className="h-7 w-7 rounded-sm border border-[#E5E7EB] text-[12px] text-[#6B7280]">
          3
        </button>
      </div>
    </ProfileLayout>
  )
}

export default MyReviews
