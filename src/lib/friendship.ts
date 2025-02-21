import { prisma } from "@/lib/prisma";

//status가 ACCEPTED고 A,B 둘 중에 하나라도 mockUser ID와 일치하는 지
export async function getFriendship(userId: string) {
  try {
    // 내가 포함된 레코드 추출
    const myFriendships = await prisma.friendship.findMany({
      where: {
        status: "ACCEPTED",
        OR: [{ userAId: userId }, { userBId: userId }],
      },
      include: {
        //friendship 테이블, user 테이블 조인
        userA: true,
        userB: true,
      },
    });

    //상대방 ID만 추출
    //내가 userA라면 userB를, 아니라면 userA id를 반환
    const friends = myFriendships.map(friendship => {
      const friend =
        friendship.userAId === userId ? friendship.userB : friendship.userA;
      return {
        id: friend.id,
        nickname: friend.nickname,
        name: friend.name,
        profileImage: friend.profileImage,
      };
    });

    return friends;
  } catch (error) {
    console.error("친구 목록 불러오는 중 오류 발생:", error);
    throw error;
  }
}
