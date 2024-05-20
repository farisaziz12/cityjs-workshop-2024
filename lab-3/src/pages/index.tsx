import { useState, useEffect } from "react";
import { Container, Grid, SimpleGrid, Skeleton, Text, rem, Title } from "@mantine/core";
import { Transaction } from "@/types";
import { StatsCollection, StatsRing, StatsTrend } from "@/components";
import { IconCreditCard } from "@tabler/icons-react";
import { useTransactionsApi } from "@/hooks";

const PRIMARY_COL_HEIGHT = rem(300);
const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

function formatDollarPrice(amount: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(amount));
}

export default function Home() {
  const { data, isLoading, error } = useTransactionsApi(
    "/api/transactions?quantity=1",
    1
  );

  if (error) {
    return (
      <Container my="xl">
        <Text ta="center" c="red">
          {error.message}
        </Text>
      </Container>
    );
  }

  const results = data.reduce(
    (acc, transaction) => {
      const newTotalAmount = acc.totalAmount + transaction.amount;
      const newAmountsByCardType = {
        ...acc.amountsByCardType,
        [transaction.cardType]:
          (acc.amountsByCardType[transaction.cardType] || 0) + transaction.amount,
      };

      return {
        totalAmount: newTotalAmount,
        domesticCount: transaction.isDomestic ? acc.domesticCount + 1 : acc.domesticCount,
        internationalCount: !transaction.isDomestic
          ? acc.internationalCount + 1
          : acc.internationalCount,
        amountsByCardType: newAmountsByCardType,
      };
    },
    {
      totalAmount: 0,
      domesticCount: 0,
      internationalCount: 0,
      amountsByCardType: {} as Record<string, number>,
    }
  );

  const topCardType =
    Object.keys(results?.amountsByCardType).length > 0
      ? Object.entries(results.amountsByCardType).sort((a, b) => b[1] - a[1])[0][0]
      : "";

  return (
    <Container
      my="xl"
      fluid
      style={{
        height: "100vh",
      }}
    >
      <Title order={1} mb={10}>
        Dashboard
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        {isLoading ? (
          <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate />
        ) : (
          <StatsCollection
            data={Object.entries(results?.amountsByCardType)
              .slice(0, 3)
              .map(([cardType, amount]) => ({
                label: cardType,
                value: formatDollarPrice(String(amount)),
                icon: IconCreditCard,
              }))}
          />
        )}
        <Grid gutter="md">
          <Grid.Col>
            {isLoading ? (
              <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate />
            ) : (
              <StatsRing
                data={[
                  {
                    label: "Top Card Type",
                    stats: topCardType,
                    progress: 65,
                    color: "teal",
                    icon: "up",
                  },
                  {
                    label: "Domestic Transactions",
                    stats: String(results.domesticCount),
                    progress: 72,
                    color: "blue",
                    icon: "up",
                  },
                  {
                    label: "Int. Transactions",
                    stats: String(results.internationalCount),
                    progress: 52,
                    color: "red",
                    icon: "down",
                  },
                ]}
              />
            )}
          </Grid.Col>
          <Grid.Col span={6}>
            {isLoading ? (
              <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate />
            ) : (
              <StatsTrend
                title="Revenue"
                value={formatDollarPrice(String(results.totalAmount))}
                diff={Math.round(Math.random() * 100)}
              />
            )}
          </Grid.Col>
          <Grid.Col span={6}>
            {isLoading ? (
              <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate />
            ) : (
              <StatsTrend
                title="Test"
                value="$13,456"
                diff={Math.round(Math.random() * -100)}
              />
            )}
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}
