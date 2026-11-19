#if UNITY_EDITOR
using EatYourVeggies.World;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;

public static class CreateBroccoliForestScene
{
    [MenuItem("Eat Your Veggies/Create Broccoli Forest Prototype")]
    public static void Create()
    {
        const string folder = "Assets/Scenes";
        if (!AssetDatabase.IsValidFolder(folder))
            AssetDatabase.CreateFolder("Assets", "Scenes");
        var scene = EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, NewSceneMode.Single);
        new GameObject("Broccoli Forest Bootstrap").AddComponent<BroccoliForestBootstrap>();
        EditorSceneManager.SaveScene(scene, folder + "/BroccoliForest.unity");
        Debug.Log("Broccoli Forest prototype scene created. Press Play to generate the clearing.");
    }
}
#endif
