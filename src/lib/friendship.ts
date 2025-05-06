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

    // 상대방 ID만 추출
    // 내가 userA라면 userB를, 아니라면 userA id를 반환
    const friends = myFriendships.map(friendship => {
      return friendship.userAId === userId
        ? friendship.userB
        : friendship.userA;
    });

    // 친구들이 소유한 MoaBox 한번에 조회
    const moaBoxes = await prisma.moaBox.findMany({
      where: {
        ownerId: { in: friends.map(friend => friend.id) }, // 친구들의 id로 MoaBox 조회
        dueDate: { gte: new Date() }, //현재 날짜 기준 <=인인 moaBox만 조회
      },
    });

    // 친구 정보와 MoaBox 유무 합치기
    const result = friends.map(friend => {
      //some으로 여부만 확인, boolean으로 저장
      const moaBoxOngoing = moaBoxes.some(
        moaBox => moaBox.ownerId === friend.id
      );
      return {
        id: friend.id,
        nickname: friend.nickname,
        name: friend.name,
        profileImage: friend.image,
        moaBoxOngoing,
      };
    });
    return result;
  } catch (error) {
    console.error("친구 목록 불러오는 중 오류 발생:", error);
    throw error;
  }
}
