import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function ServiceForm() {
  const { axios, getToken } = useAppContext();

  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    about: "",
    price: "",
  });

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const placeholder = "https://placehold.co/150";

  const handleImageChange = (e, key) => {
    setImages({ ...images, [key]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !inputs.title ||
      !inputs.description ||
      !inputs.about ||
      !inputs.price ||
      !Object.values(images).some((img) => img)
    ) {
      toast.error("Fill all fields and upload at least 1 image");
      return;
    }

    setLoading(true);

    try {
      let formData = new FormData();
      formData.append("title", inputs.title);
      formData.append("description", inputs.description);
      formData.append("about", inputs.about);
      formData.append("price", inputs.price);

      Object.keys(images).forEach((key) => {
        if (images[key]) formData.append("images", images[key]);
      });

      const { data } = await axios.post("/api/jetskii", formData);

      if (data.success) {
        toast.success("Service Added Successfully");

        setInputs({
          title: "",
          description: "",
          about: "",
          price: "",
        });

        setImages({ 1: null, 2: null, 3: null, 4: null });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }

    alert("successful")
  };

  return (
    <div className="flex justify-center py-1 bg-gray-100 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl space-y-6 border border-white/30"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Add New Service
        </h1>

        {/* Title */}
        <div>
          <label className="font-semibold text-gray-800">Title</label>
          <input
            type="text"
            className="w-full p-3 mt-1 rounded-xl bg-white/70 border border-gray-300"
            value={inputs.title}
            onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold text-gray-800">Description</label>
          <textarea
            className="w-full p-3 mt-1 rounded-xl bg-white/70 border border-gray-300"
            rows="3"
            value={inputs.description}
            onChange={(e) =>
              setInputs({ ...inputs, description: e.target.value })
            }
          ></textarea>
        </div>

        {/* About */}
        <div>
          <label className="font-semibold text-gray-800">About</label>
          <textarea
            className="w-full p-3 mt-1 rounded-xl bg-white/70 border border-gray-300"
            rows="3"
            value={inputs.about}
            onChange={(e) => setInputs({ ...inputs, about: e.target.value })}
          ></textarea>
        </div>

        {/* Price */}
        <div>
          <label className="font-semibold text-gray-800">Price</label>
          <input
            type="number"
            className="w-full p-3 mt-1 rounded-xl bg-white/70 border border-gray-300"
            value={inputs.price}
            onChange={(e) => setInputs({ ...inputs, price: e.target.value })}
          />
        </div>

        {/* Images */}
        <div>
          <h2 className="font-semibold mb-2 text-gray-800">Service Images</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.keys(images).map((key) => (
              <label
                key={key}
                className="cursor-pointer group relative block rounded-xl overflow-hidden border border-gray-300 bg-white/70"
              >
                <img
                  src={
                    images[key]
                      ? URL.createObjectURL(images[key])
                      : placeholder
                  }
                  className="w-full h-28 object-cover group-hover:opacity-90 transition"
                />

                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, key)}
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-sm text-white transition">
                  Upload
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-lg shadow-lg"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default ServiceForm;
