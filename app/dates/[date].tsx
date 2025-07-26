import { useEventByDateQuery } from "@/data/hooks/useEventByDateQuery";
import { Link, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function DatePage() {
  const { date } = useLocalSearchParams<{ date: string }>();

  const result = useEventByDateQuery(date);
  if (result.isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg text-gray-500">Loading...</Text>
      </View>
    );
  }
  if (!result.data) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg text-red-500">Date not found</Text>
      </View>
    );
  }
  return (
    <View className="flex-1">
      <View className="p-4 bg-blue-500 items-center flex-row justify-between">
        {result.data.previousDate ? (
          <Link href={`/dates/${result.data.previousDate}`} className="text-white text-lg font-semibold">
            {result.data.previousDate}
          </Link>
        ) : (
          <View />
        )}
        <Text className="text-white text-lg font-semibold">
          {result.data.data.date}
        </Text>
        {result.data.nextDate ? (
          <Link href={`/dates/${result.data.nextDate}`} className="text-white text-lg font-semibold">
            {result.data.nextDate}
          </Link>
        ) : (
          <View />
        )}
      </View>
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg text-gray-600">
          {result.data.data.description || "No description available"}
        </Text>
      </View>
    </View>
  );
}
