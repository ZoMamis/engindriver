import { useState } from "react";
import { Button } from "../../components/button";
import { Calendar } from "../../components/calendar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/card";
import { Label } from "../../components/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../components/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/select";
import { Textarea } from "../../components/textarea";
import { Input } from "../../components/input";
import { FaCalendarDays } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";

const PatientForm = () => {
  const [dateNaissance, setDateNaissance] = useState<Date>();
  const [dateAdmission, setDateAdmission] = useState<Date>();
  const [antecedentsMedicaux, setAntecedentsMedicaux] = useState<string[]>([
    "",
  ]);
  const [antecedentsChirurgicaux, setAntecedentsChirurgicaux] = useState<
    string[]
  >([""]);

  const addAntecedent = (type: "medicaux" | "chirurgicaux") => {
    if (type === "medicaux") {
      setAntecedentsMedicaux([...antecedentsMedicaux, ""]);
    } else {
      setAntecedentsChirurgicaux([...antecedentsChirurgicaux, ""]);
    }
  };

  const updateAntecedent = (
    type: "medicaux" | "chirurgicaux",
    index: number,
    value: string
  ) => {
    if (type === "medicaux") {
      const updated = [...antecedentsMedicaux];
      updated[index] = value;
      setAntecedentsMedicaux(updated);
    } else {
      const updated = [...antecedentsChirurgicaux];
      updated[index] = value;
      setAntecedentsChirurgicaux(updated);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("fr-FR");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulaire soumis");
    // Ici vous pouvez traiter les données du formulaire
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            FICHE D'OBSERVATION
          </CardTitle>
          <p className="text-center text-sm text-gray-600">
            (Thérapeutique - Suivi social)
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          <form onSubmit={handleSubmit}>
            {/* Section A: État Civil */}
            <div>
              <h3 className="text-lg font-semibold mb-4 border-b pb-2 text-gray-800">
                ÉTAT CIVIL
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nom">NOM</Label>
                  <Input id="nom" placeholder="Nom de famille" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prenom">PRÉNOM</Label>
                  <Input id="prenom" placeholder="Prénom" />
                </div>
                <div className="space-y-2">
                  <Label>DATE DE NAISSANCE</Label>
                  <Popover>
                    <PopoverTrigger>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-transparent"
                      >
                        <FaCalendarDays className="mr-2 h-4 w-4" />
                        {dateNaissance
                          ? formatDate(dateNaissance)
                          : "Sélectionner une date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateNaissance}
                        onSelect={setDateNaissance}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">ÂGE</Label>
                  <Input id="age" type="number" placeholder="Âge" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profession">PROFESSION</Label>
                  <Input id="profession" placeholder="Profession" />
                </div>
                <div className="space-y-2">
                  <Label>GENRE</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masculin">Masculin</SelectItem>
                      <SelectItem value="feminin">Féminin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adresse">ADRESSE</Label>
                  <Input id="adresse" placeholder="Adresse complète" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationalite">NATIONALITÉ</Label>
                  <Input id="nationalite" placeholder="Nationalité" />
                </div>
              </div>
            </div>

            {/* Section B: Admission */}
            <div>
              <h3 className="text-lg font-semibold mb-4 border-b pb-2 text-gray-800">
                ADMISSION
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>CONSULTATION</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="visio">En visio</SelectItem>
                      <SelectItem value="presentielle">
                        En présentiel
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>DATE</Label>
                  <Popover>
                    <PopoverTrigger>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-transparent"
                      >
                        <FaCalendarDays className="mr-2 h-4 w-4" />
                        {dateAdmission
                          ? formatDate(dateAdmission)
                          : "Sélectionner une date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateAdmission}
                        onSelect={setDateAdmission}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="motif">MOTIF</Label>
                  <Textarea
                    id="motif"
                    placeholder="Motif de consultation"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>SOURCE DE RÉFÉRENCE</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="palais">Reference</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Section C: Mode de Vie */}
            <div>
              <h3 className="text-lg font-semibold mb-4 border-b pb-2 text-gray-800">
                MODE DE VIE
              </h3>
              <div className="space-y-2">
                <Textarea
                  placeholder="Décrivez le mode de vie du patient, ses habitudes, son environnement social et familial..."
                  rows={6}
                  className="min-h-[120px]"
                />
              </div>
            </div>

            {/* Section D: Antécédents */}
            <div>
              <h3 className="text-lg font-semibold mb-4 border-b pb-2 text-gray-800">
                ANTÉCÉDENTS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">MÉDICAUX</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addAntecedent("medicaux")}
                    >
                      <FaPlusCircle className="h-4 w-4 mr-1" />
                      Ajouter
                    </Button>
                  </div>
                  {antecedentsMedicaux.map((antecedent, index) => (
                    <Input
                      key={index}
                      value={antecedent}
                      onChange={(e) =>
                        updateAntecedent("medicaux", index, e.target.value)
                      }
                      placeholder={`Antécédent médical ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">
                      CHIRURGICAUX
                    </Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addAntecedent("chirurgicaux")}
                    >
                      <FaPlusCircle className="h-4 w-4 mr-1" />
                      Ajouter
                    </Button>
                  </div>
                  {antecedentsChirurgicaux.map((antecedent, index) => (
                    <Input
                      key={index}
                      value={antecedent}
                      onChange={(e) =>
                        updateAntecedent("chirurgicaux", index, e.target.value)
                      }
                      placeholder={`Antécédent chirurgical ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <Button type="submit" size="lg" className="px-8">
                Enregistrer la fiche d'observation
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientForm;
