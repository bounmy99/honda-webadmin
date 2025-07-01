import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MessageViewPage() {
  const params = useSearchParams();
  const router = useRouter();
  const id = params.get("id");
  const [customer, setCustomer] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const cars = JSON.parse(localStorage.getItem("cars") || "[]");
    const selected = cars.find((item) => item.id === Number(id));
    setCustomer(selected);

    if (selected?.image) setImagePreview(selected.image);

    const history = JSON.parse(localStorage.getItem(`messages-${id}`) || "[]");
    setMessages(history);
  }, [id]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    const updated = [
      ...messages,
      { text: message, time: new Date().toISOString() },
    ];
    localStorage.setItem(`messages-${id}`, JSON.stringify(updated));
    setMessages(updated);
    setMessage("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);

        const cars = JSON.parse(localStorage.getItem("cars") || "[]");
        const updated = cars.map((c) =>
          c.id === Number(id) ? { ...c, image: reader.result } : c
        );
        localStorage.setItem("cars", JSON.stringify(updated));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    const cars = JSON.parse(localStorage.getItem("cars") || "[]");
    const updated = cars.map((c) =>
      c.id === Number(id) ? { ...c, image: null } : c
    );
    localStorage.setItem("cars", JSON.stringify(updated));
  };

  if (!customer) {
    return (
      <div className="p-8 text-center text-gray-500">ກຳລັງໂຫຼດຂໍ້ມູນ...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1F263E] to-[#20464f] flex items-center justify-center">
      <div className="max-w-[1000px] mx-auto bg-white shadow-md rounded-xl p-20">
        <button
          onClick={() => router.back()}
          className="mb-4 text-sm text-gray-700 border px-4 py-1 rounded hover:bg-gray-200"
        >
          ກັບໄປຫນ້າກ່ອນ
        </button>

        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* Image preview + control */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-64 h-64 bg-gray-100 border rounded overflow-hidden">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  ບໍ່ມີຮູບ
                </div>
              )}
            </div>
            <div className="flex gap-2 mt-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="upload-image"
              />
              <label
                htmlFor="upload-image"
                className="bg-[#1C203E] text-white px-6 py-2 rounded-xl cursor-pointer"
              >
                ເພີ່ມຮູບພາບ
              </label>
              {imagePreview && (
                <button
                  onClick={handleRemoveImage}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  ລຶບຮູບພາບ
                </button>
              )}
            </div>
          </div>

          {/* Message Area */}
          <div className="w-full flex-1">
            <div className="flex flex-wrap gap-2 mb-4">
              <button className="bg-gray-200 px-3 py-1 rounded">
                ແຈ້ງໂປຣໂມຊັນ
              </button>
              <button className="bg-gray-200 px-3 py-1 rounded">ຂ່າວສານ</button>
              <button
                className="bg-gray-300 text-gray-400 px-3 py-1 rounded"
                disabled
              >
                ລ່າງຂໍ້ຄວາມ
              </button>
            </div>

            <textarea
              className="w-full min-h-[120px] border rounded-lg p-3 shadow-inner"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Hello! “ ${customer.ຊື່ລູກຄ້າ} ”...`}
            />

            <button
              onClick={handleSendMessage}
              className="mt-4 bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600"
            >
              ສົ່ງຂໍ້ຄວາມ
            </button>

            {/* Display chat history */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">ປະຫວັດຂໍ້ຄວາມ</h3>
              {messages.length === 0 ? (
                <p className="text-gray-400">ບໍ່ມີຂໍ້ຄວາມ</p>
              ) : (
                <ul className="space-y-2">
                  {messages.map((msg, index) => (
                    <li
                      key={index}
                      className="bg-gray-100 p-2 rounded shadow-sm"
                    >
                      <span className="block text-sm text-gray-700">
                        {msg.text}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(msg.time).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
