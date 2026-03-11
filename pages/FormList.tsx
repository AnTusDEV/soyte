import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { api } from "@/api";

const FormList: React.FC = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const res = await api.get("/forms");

        const apiForms = res.data.items;

        const formattedForms = apiForms.map((item) => ({
          id: item.id,
          name: item.name,
          status: item.status,
          description: item.description,
        }));

        setForms(formattedForms);
      } catch (error) {
        console.error("Fetch forms error:", error);
      }
    };

    fetchForms();
  }, []);
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-primary-800 tracking-tight">
          Kho biểu mẫu trực tuyến
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {forms.map(
            (form) =>
              form.status === "active" && (
                <Link
                  key={form.id}
                  to={`/forms/${form.id}`}
                  className="group block p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-primary-500 hover:border-primary-600"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary-100 p-4 rounded-full">
                      <FileText className="w-8 h-8 text-primary-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-800 group-hover:text-primary-700 transition-colors">
                        {form.name}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Nhấn để xem và điền thông tin
                        {form.status}
                      </p>
                    </div>
                  </div>
                </Link>
              ),
          )}
        </div>
      </div>
    </div>
  );
};

export default FormList;
