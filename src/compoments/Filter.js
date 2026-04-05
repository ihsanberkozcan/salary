import { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "./Dropdown";
import { datas } from "../data";

import { Button, Space, Flex, Card } from "@mantine/core";
import { useLoadingStore, useSalaryStore } from "../stores";

// 2026 verisini normalize et
const normalize2026 = (data) => {
  return data.map((item) => ({
    level: item["Uzmanlığınız nedir?"],
    position: item["Hangi pozisyonda çalışıyorsunuz?"],
    tech_stack: item["Hangi teknolojileri/araçları kullanıyorsunuz?"],
    experience: item["Kaç yıldır sektörde çalışıyorsunuz?"],
    gender: item["Cinsiyetiniz nedir?"],
    company: item["Çalıştığınız şirketi nasıl tanımlarsınız?"],
    company_size: item["Şirketin çalışan sayısı nedir?"],
    work_type: item["Şirketinizin çalışma düzeni nedir?"],
    city: item["Hangi ülkede/şehirde çalışıyorsunuz/yaşıyorsunuz?"],
    currency: item["Hangi para birimi ile maaş alıyorsunuz?"],
    salary:
      item[
        "Aylık [NET] geliriniz nedir? (Brüt maaş alıyorsanız, yıllık net gelirinizi 12'ye bölüp aylık kazancınızı seçebilirsiniz. Bir önceki adımda seçtiğiniz para birimine göre seçim yapmalısınız.)"
      ],
    raise_period: item["Yılda kaç kez zam alıyorsunuz?"],
  }));
};

function Filter() {
  const { loading, setLoading } = useLoadingStore();
  const [dropdownSelectedValue, setDropdownSelectedValue] = useState({});
  const {
    filteredSalary2023,
    filteredSalary2024,
    filteredSalary2025,
    filteredSalary2026,
  } = useSalaryStore();

  const [data2023, setData2023] = useState([]);
  const [data2024, setData2024] = useState([]);
  const [data2025, setData2025] = useState([]);
  const [data2026, setData2026] = useState([]);

  // veri çek
  const fetchedData = async () => {
    const salary2023 = await axios.get(
      "https://raw.githubusercontent.com/oncekiyazilimci/2023-yazilim-sektoru-maaslari/main/2023-yazilim-sektoru-maaslari-oncekiyazilimci.json"
    );
    const salary2024 = await axios.get(
      "https://raw.githubusercontent.com/oncekiyazilimci/2024-yazilim-sektoru-maaslari/main/2024-yazilim-sektoru-maaslari-onceki-yazilimci.json"
    );
    const salary2025 = await axios.get(
      "https://raw.githubusercontent.com/oncekiyazilimci/2025-yazilim-sektoru-maaslari/refs/heads/main/2025-yazilim-sektoru-maaslari-onceki-yazilimci.json"
    );
    const salary2026 = await axios.get(
      "https://raw.githubusercontent.com/oncekiyazilimci/2026-yazilim-sektoru-maaslari/refs/heads/main/2026-yazilim-sektoru-maaslari-onceki-yazilimci.json"
    );

    const turkLirasi2023 = salary2023.data.RECORDS.filter(
      (data) => data.currency === "₺ - Türk Lirası"
    );
    const turkLirasi2024 = salary2024.data.RECORDS.filter(
      (data) => data.currency === "₺ - Türk Lirası"
    );
    const turkLirasi2025 = salary2025.data.filter(
      (data) => data.currency === "₺ - Türk Lirası"
    );
    const turkLirasi2026 = normalize2026(salary2026.data).filter(
      (data) => data.currency === "₺ - Türk Lirası"
    );

    setData2023(turkLirasi2023);
    setData2024(turkLirasi2024);
    setData2025(turkLirasi2025);
    setData2026(turkLirasi2026);

    filteredSalary2023(turkLirasi2023);
    filteredSalary2024(turkLirasi2024);
    filteredSalary2025(turkLirasi2025);
    filteredSalary2026(turkLirasi2026);

    setLoading();
  };

  useEffect(() => {
    fetchedData();
  }, []);

  // filtre uygula
  const calculateSalary = (e) => {
    e.preventDefault();
    const objectKeys = Object.keys(dropdownSelectedValue);

    let filtered2023 = data2023;
    let filtered2024 = data2024;
    let filtered2025 = data2025;
    let filtered2026 = data2026;

    objectKeys.forEach((key) => {
      filtered2023 = filtered2023.filter(
        (data) => data[key] === dropdownSelectedValue[key]
      );
      filtered2024 = filtered2024.filter(
        (data) => data[key] === dropdownSelectedValue[key]
      );
      filtered2025 = filtered2025.filter(
        (data) => data[key] === dropdownSelectedValue[key]
      );
      filtered2026 = filtered2026.filter(
        (data) => data[key] === dropdownSelectedValue[key]
      );
    });

    filteredSalary2023(filtered2023);
    filteredSalary2024(filtered2024);
    filteredSalary2025(filtered2025);
    filteredSalary2026(filtered2026);
  };

  // dropdown change
  const handleChane = (e, name) => {
    if (e.target.value && e.target.value !== "" && e.target.value !== "All") {
      setDropdownSelectedValue({
        ...dropdownSelectedValue,
        [name]: e.target.value,
      });
    } else {
      const newState = { ...dropdownSelectedValue };
      delete newState[name];
      setDropdownSelectedValue(newState);
    }
  };

  // reset filters
  const resetFilters = () => {
    setDropdownSelectedValue({});
    filteredSalary2023(data2023);
    filteredSalary2024(data2024);
    filteredSalary2025(data2025);
    filteredSalary2026(data2026);
  };

  return (
    <div>
      {!loading ? (
        <Flex justify="center">
          <Card
            withBorder
            radius="md"
            shadow="sm"
            padding="lg"
            sx={(theme) => ({
              width: "100%",
              maxWidth: 350,
              [`@media (max-width: 768px)`]: {
                maxWidth: "100%",
              },
            })}
          >
            {datas.map((data) => (
              <div key={data.id}>
                <Dropdown
                  name={data.name}
                  handleChane={handleChane}
                  question={data.question}
                  options={data.options}
                  value={dropdownSelectedValue[data.name] || ""}
                />
                <Space h="xs" />
              </div>
            ))}

            <Space h="sm" />

            <Button color="violet" fullWidth size="md" onClick={calculateSalary}>
              Salary Filter
            </Button>

            <Space h="sm" />

      
          </Card>
        </Flex>
      ) : (
        <div className="full">
          <span className="loader"></span>
        </div>
      )}
    </div>
  );
}

export default Filter;