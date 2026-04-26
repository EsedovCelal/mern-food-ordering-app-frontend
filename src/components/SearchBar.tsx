import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { useForm } from "react-hook-form";
import { RotateCcw, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState, useRef } from "react";

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Restaurant name is required",
  }),
});

type Props = {
  onSubmit: (formData: SearchForm) => void;
  placeHolder: string;
  onReset?: () => void;
  searchQuery: string;
  suggestions?: string[];
};

export type SearchForm = z.infer<typeof formSchema>;

const SearchBar = ({
  onSubmit,
  onReset,
  placeHolder,
  searchQuery,
  suggestions = [],
}: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { searchQuery },
  });

  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      )
        setShowSuggestions(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (value: string) => {
    if (value.trim() === "") {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const filtered = suggestions.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
    setHighlightedIndex(-1);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    form.setValue("searchQuery", suggestion);
    setShowSuggestions(false);
    setFilteredSuggestions([]);
    form.handleSubmit(onSubmit)();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % filteredSuggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev <= 0 ? filteredSuggestions.length - 1 : prev - 1,
      );
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelectSuggestion(filteredSuggestions[highlightedIndex]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleReset = () => {
    form.reset({ searchQuery: "" });
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    if (onReset) onReset();
  };

  return (
    <Form {...form}>
      <div ref={containerRef} className="relative w-full">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3 ${
            form.formState.errors.searchQuery && "border-red-500"
          }`}
        >
          <Search
            strokeWidth={2.5}
            size={20}
            className="ml-1 hidden sm:inline text-orange-500"
          />
          <FormField
            control={form.control}
            name="searchQuery"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    {...field}
                    className="border-none shadow-none sm:text-xl! text-base! focus-visible:ring-0"
                    placeholder={placeHolder}
                    autoComplete="off"
                    onChange={(e) => {
                      field.onChange(e);
                      handleInputChange(e.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                    onFocus={() => {
                      setFilteredSuggestions(
                        field.value.trim() === ""
                          ? suggestions // show all when empty
                          : filteredSuggestions, // keep current filtered list
                      );
                      setShowSuggestions(suggestions.length > 0);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            onClick={handleReset}
            type="button"
            variant="outline"
            className="rounded-full"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Reset</span>
          </Button>

          <Button type="submit" className="rounded-full bg-orange-500">
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Search</span>
          </Button>
        </form>

        {showSuggestions && (
          <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={suggestion}
                onMouseDown={() => handleSelectSuggestion(suggestion)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`flex items-center gap-2 px-5 py-2.5 cursor-pointer text-sm transition-colors ${
                  index === highlightedIndex
                    ? "bg-orange-50 text-orange-600"
                    : "hover:bg-gray-50"
                }`}
              >
                <Search size={14} className="text-orange-400 shrink-0" />
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Form>
  );
};

export default SearchBar;
